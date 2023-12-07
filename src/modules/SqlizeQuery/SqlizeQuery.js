const { DataTypes, Model } = require('sequelize')

function getPrimitiveDataType(dataType) {
  const findDataType = (item) => dataType instanceof item

  if (
    [
      DataTypes.JSON,
      DataTypes.TEXT,
      DataTypes.STRING,
      DataTypes.UUID,
      DataTypes.UUIDV1,
      DataTypes.UUIDV4,
    ].find(findDataType)
  ) {
    return 'string'
  }

  if (
    [
      DataTypes.REAL,
      DataTypes.INTEGER,
      DataTypes.FLOAT,
      DataTypes.BIGINT,
      DataTypes.DECIMAL,
      DataTypes.DOUBLE,
      DataTypes.MEDIUMINT,
      DataTypes.NUMBER,
      DataTypes.SMALLINT,
      DataTypes.TINYINT,
    ].find(findDataType)
  ) {
    return 0
  }

  // DataTypes.STRING
  // DataTypes.CHAR
  // DataTypes.TEXT
  // DataTypes.NUMBER
  // DataTypes.TINYINT
  // DataTypes.SMALLINT
  // DataTypes.MEDIUMINT
  // DataTypes.INTEGER
  // DataTypes.BIGINT
  // DataTypes.FLOAT
  // DataTypes.REAL
  // DataTypes.DOUBLE
  // DataTypes.DECIMAL
  // DataTypes.BOOLEAN
  // DataTypes.TIME
  // DataTypes.DATE
  // DataTypes.DATEONLY
  // DataTypes.HSTORE
  // DataTypes.JSON
  // DataTypes.JSONB
  // DataTypes.NOW
  // DataTypes.BLOB
  // DataTypes.RANGE
  // DataTypes.UUID
  // DataTypes.UUIDV1
  // DataTypes.UUIDV4
  // DataTypes.VIRTUAL
  // DataTypes.ENUM
  // DataTypes.ARRAY
  // DataTypes.GEOMETRY
  // DataTypes.GEOGRAPHY
  // DataTypes.CIDR
  // DataTypes.INET
  // DataTypes.MACADDR
  // DataTypes.CITEXT
  // if([
  //   DataTypes.NUMBER
  // ])

  // default is string
  return 'string'
}

class TransformHelper {
  value

  constructor(initialValue) {
    this.setValue(initialValue)
  }

  setValue(value) {
    this.value = value
  }

  getValue() {
    return this.value
  }
}

class QueryHelper {
  valueQuery = {}
  data
  constructor(data) {
    this.data = data
  }

  getDataValueById(id) {
    return this.data.find((x) => x.id === id)?.value
  }

  setQuery(id, value) {
    // set(this.valueQuery, id, value)
    this.valueQuery[id] = value
  }

  getQuery() {
    return this.valueQuery
  }

  getQueryById(id) {
    return this.valueQuery[id]
  }

  deleteQuery(id) {
    return delete this.valueQuery[id]
  }
}

class SqlizeQuery {
  valueParsers = []
  transformBuilds = []
  QueryBuilders = []

  addValueParser(fn) {
    this.valueParsers.push(fn)
  }

  addQueryBuilder(fn) {
    this.QueryBuilders.push(fn)
  }

  addTransformBuild(fn) {
    this.transformBuilds.push(fn)
  }

  build(value) {
    let parserValue = value
    for (let i = 0; i < this.valueParsers.length; i++) {
      const getterValue = this.valueParsers[i]
      parserValue = getterValue(value)
    }

    const queryHelper = new QueryHelper(parserValue)
    // executed queryBuilder min 1, when parserValue no data
    for (let i = 0; i < (parserValue.length || 1); i++) {
      const valueP = parserValue[i]
      for (let k = 0; k < this.QueryBuilders.length; k++) {
        const queryBuilder = this.QueryBuilders[k]
        queryBuilder(valueP, queryHelper)
      }
    }

    let result = queryHelper.getQuery()
    const transformHelper = new TransformHelper(result)
    for (let i = 0; i < this.transformBuilds.length; i++) {
      const transformBuild = this.transformBuilds[i]
      transformBuild(result, transformHelper)
    }

    return transformHelper.getValue()
  }
}

function transfromIncludeToQueryable(includes, onBuildInclude) {
  const result = []
  const _onBuildInclude =
    onBuildInclude ||
    function (value) {
      return value
    }
  function wrapFiltered(includes, parent) {
    for (let i = 0; i < includes.length; i++) {
      const include = includes[i]

      const { model, key, include: oriInclude, ...restInclude } = include

      // TODO: fix compare isTypeModel for better check typing
      const isTypeModel = typeof Model === typeof include
      const curModel = isTypeModel ? include : model
      const defaultName = curModel.options.name?.singular
      const data = _onBuildInclude({
        ...(isTypeModel ? {} : restInclude),
        key: key || defaultName,
        model: curModel,
      })

      if (parent) {
        parent.include = parent.include || []
        parent.include.push(data)
      } else {
        result.push(data)
      }

      if (include.include) {
        wrapFiltered(include.include, data)
      }
    }
  }
  wrapFiltered(includes)
  return result
}

module.exports = {
  SqlizeQuery,
  getPrimitiveDataType,
  transfromIncludeToQueryable,
}
