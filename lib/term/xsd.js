import namespace from '@rdfjs/namespace'
import DatatypeValidation from './DatatypeValidation.js'
import IntegerValidation from './IntegerValidation.js'
import InValidation from './InValidation.js'
import PatternValidation from './PatternValidation.js'

const ns = {
  xsd: namespace('http://www.w3.org/2001/XMLSchema#')
}

// Special Built-in Datatypes
const anySimpleType = new DatatypeValidation({ datatypes: ns.xsd.anySimpleType })
const anyAtomicType = new DatatypeValidation({ datatypes: ns.xsd.anyAtomicType })

// Primitive Datatypes
const stringPattern = /^([^\ud8ff-\udfff\ufffe-\uffff]*)$/
const decimalPattern = /^((\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+))$/
const floatPattern = /^((\+|-)?([0-9]+(\.[0-9]*)?|\.[0-9]+)([Ee](\+|-)?[0-9]+)?|(\+|-)?INF|NaN)$/
const durationPattern = /^(-?P((([0-9]+Y([0-9]+M)?([0-9]+D)?|([0-9]+M)([0-9]+D)?|([0-9]+D))(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S)))?)|(T(([0-9]+H)([0-9]+M)?([0-9]+(\.[0-9]+)?S)?|([0-9]+M)([0-9]+(\.[0-9]+)?S)?|([0-9]+(\.[0-9]+)?S)))))$/
const dateTimePattern = /^(-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T(([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const timePattern = /^((([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?|(24:00:00(\.0+)?))(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const datePattern = /^(-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const gYearMonthPattern = /^(-?([1-9][0-9]{3,}|0[0-9]{3})-(0[1-9]|1[0-2])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const gYearPattern = /^(-?([1-9][0-9]{3,}|0[0-9]{3})(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const gMonthDayPattern = /^(--(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const gDayPattern = /^(---(0[1-9]|[12][0-9]|3[01])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const gMonthPattern = /^(--(0[1-9]|1[0-2])(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))?)$/
const hexBinaryPattern = /^(([0-9a-fA-F]{2})*)$/
const base64BinaryPattern = /^(((([A-Za-z0-9+/] ?){4})*(([A-Za-z0-9+/] ?){3}[A-Za-z0-9+/]|([A-Za-z0-9+/] ?){2}[AEIMQUYcgkosw048] ?=|[A-Za-z0-9+/] ?[AQgw] ?= ?=))?)$/

const string = new PatternValidation(stringPattern, ns.xsd.string)
const boolean = new InValidation(['1', 'true', '0', 'false'], ns.xsd.boolean)
const decimal = new PatternValidation(decimalPattern, ns.xsd.decimal)
const float = new PatternValidation(floatPattern, ns.xsd.float)
const double = new PatternValidation(floatPattern, ns.xsd.double)
const duration = new PatternValidation(durationPattern, ns.xsd.duration)
const dateTime = new PatternValidation(dateTimePattern, ns.xsd.dateTime)
const time = new PatternValidation(timePattern, ns.xsd.time)
const date = new PatternValidation(datePattern, ns.xsd.date)
const gYearMonth = new PatternValidation(gYearMonthPattern, ns.xsd.gYearMonth)
const gYear = new PatternValidation(gYearPattern, ns.xsd.gYear)
const gMonthDay = new PatternValidation(gMonthDayPattern, ns.xsd.gMonthDay)
const gDay = new PatternValidation(gDayPattern, ns.xsd.gDay)
const gMonth = new PatternValidation(gMonthPattern, ns.xsd.gMonth)
const hexBinary = new PatternValidation(hexBinaryPattern, ns.xsd.hexBinary)
const base64Binary = new PatternValidation(base64BinaryPattern, ns.xsd.base64Binary)
const anyURI = new PatternValidation(stringPattern, ns.xsd.anyURI)

// Other Built-in Datatypes
const normalizedStringPattern = /^([^\u000d\u000a\u0009]*)$/ // eslint-disable-line no-control-regex
const tokenPattern = /^([^ ]+( [^ ]+)*)*$/
const languagePattern = /^([a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*)$/
const yearMonthDurationPattern = /^([^DT]*)$/
const dayTimeDurationPattern = /^([^YM]*[DT].*)$/
const dateTimeStampPattern = /^(.*(Z|(\+|-)[0-9][0-9]:[0-9][0-9]))$/

const normalizedString = new PatternValidation([stringPattern, normalizedStringPattern], ns.xsd.normalizedString)
const token = new PatternValidation([stringPattern, normalizedStringPattern, tokenPattern], ns.xsd.token)
const language = new PatternValidation(languagePattern, ns.xsd.language)

const integer = new IntegerValidation(null, null, ns.xsd.integer)
const nonPositiveInteger = new IntegerValidation(null, '0', ns.xsd.nonPositiveInteger)
const negativeInteger = new IntegerValidation(null, '-1', ns.xsd.negativeInteger)
const long = new IntegerValidation('-9223372036854775808', '9223372036854775807', ns.xsd.long)
const int = new IntegerValidation('-2147483648', '2147483647', ns.xsd.int)
const short = new IntegerValidation('-32768', '32767', ns.xsd.short)
const byte = new IntegerValidation('-128', '127', ns.xsd.byte)
const nonNegativeInteger = new IntegerValidation('0', null, ns.xsd.nonNegativeInteger)
const unsignedLong = new IntegerValidation('0', '18446744073709551615', ns.xsd.unsignedLong)
const unsignedInt = new IntegerValidation('0', '4294967295', ns.xsd.unsignedInt)
const unsignedShort = new IntegerValidation('0', '65535', ns.xsd.unsignedShort)
const unsignedByte = new IntegerValidation('0', '255', ns.xsd.unsignedByte)
const positiveInteger = new IntegerValidation('1', null, ns.xsd.positiveInteger)
const yearMonthDuration = new PatternValidation([durationPattern, yearMonthDurationPattern], ns.xsd.yearMonthDuration)
const dayTimeDuration = new PatternValidation([durationPattern, dayTimeDurationPattern], ns.xsd.dayTimeDuration)
const dateTimeStamp = new PatternValidation([dateTimePattern, dateTimeStampPattern], ns.xsd.dateTimeStamp)

export {
  // Special Built-in Datatypes
  anySimpleType,
  anyAtomicType,

  // Primitive Datatypes
  string,
  boolean,
  decimal,
  float,
  double,
  duration,
  dateTime,
  time,
  date,
  gYearMonth,
  gYear,
  gMonthDay,
  gDay,
  gMonth,
  hexBinary,
  base64Binary,
  anyURI,
  // QName,
  // NOTATION,

  // Other Built-in Datatypes
  normalizedString,
  token,
  language,
  // NMTOKEN,
  // NMTOKENS,
  // Name,
  // NCName,
  // ID,
  // IDREF,
  // IDREFS,
  // ENTITY,
  // ENTITIES,
  integer,
  nonPositiveInteger,
  negativeInteger,
  long,
  int,
  short,
  byte,
  nonNegativeInteger,
  unsignedLong,
  unsignedInt,
  unsignedShort,
  unsignedByte,
  positiveInteger,
  yearMonthDuration,
  dayTimeDuration,
  dateTimeStamp
}
