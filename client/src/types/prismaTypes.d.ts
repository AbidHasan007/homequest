
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Landlord
 * 
 */
export type Landlord = $Result.DefaultSelection<Prisma.$LandlordPayload>
/**
 * Model Tenant
 * 
 */
export type Tenant = $Result.DefaultSelection<Prisma.$TenantPayload>
/**
 * Model Property
 * 
 */
export type Property = $Result.DefaultSelection<Prisma.$PropertyPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model Application
 * 
 */
export type Application = $Result.DefaultSelection<Prisma.$ApplicationPayload>
/**
 * Model Lease
 * 
 */
export type Lease = $Result.DefaultSelection<Prisma.$LeasePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model SafetyIndicator
 * 
 */
export type SafetyIndicator = $Result.DefaultSelection<Prisma.$SafetyIndicatorPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Highlight: {
  HighSpeedInternetAccess: 'HighSpeedInternetAccess',
  WasherDryer: 'WasherDryer',
  AirConditioning: 'AirConditioning',
  Heating: 'Heating',
  SmokeFree: 'SmokeFree',
  CableReady: 'CableReady',
  SatelliteTV: 'SatelliteTV',
  DoubleVanities: 'DoubleVanities',
  TubShower: 'TubShower',
  Intercom: 'Intercom',
  SprinklerSystem: 'SprinklerSystem',
  RecentlyRenovated: 'RecentlyRenovated',
  CloseToTransit: 'CloseToTransit',
  GreatView: 'GreatView',
  QuietNeighborhood: 'QuietNeighborhood'
};

export type Highlight = (typeof Highlight)[keyof typeof Highlight]


export const Amenity: {
  WasherDryer: 'WasherDryer',
  AirConditioning: 'AirConditioning',
  Dishwasher: 'Dishwasher',
  HighSpeedInternet: 'HighSpeedInternet',
  HardwoodFloors: 'HardwoodFloors',
  WalkInClosets: 'WalkInClosets',
  Microwave: 'Microwave',
  Refrigerator: 'Refrigerator',
  Pool: 'Pool',
  Gym: 'Gym',
  Parking: 'Parking',
  PetsAllowed: 'PetsAllowed',
  WiFi: 'WiFi'
};

export type Amenity = (typeof Amenity)[keyof typeof Amenity]


export const PropertyType: {
  Rooms: 'Rooms',
  Apartment: 'Apartment',
  Mess: 'Mess',
  Sublet: 'Sublet',
 
};

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType]


export const ApplicationStatus: {
  Pending: 'Pending',
  Denied: 'Denied',
  Approved: 'Approved'
};

export type ApplicationStatus = (typeof ApplicationStatus)[keyof typeof ApplicationStatus]


export const PaymentStatus: {
  Pending: 'Pending',
  Paid: 'Paid',
  PartiallyPaid: 'PartiallyPaid',
  Overdue: 'Overdue'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const SafetyLevel: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH'
};

export type SafetyLevel = (typeof SafetyLevel)[keyof typeof SafetyLevel]


export const GenderPreference: {
  MaleOnly: 'MaleOnly',
  FemaleOnly: 'FemaleOnly',
  Mixed: 'Mixed'
};

export type GenderPreference = (typeof GenderPreference)[keyof typeof GenderPreference]

}

export type Highlight = $Enums.Highlight

export const Highlight: typeof $Enums.Highlight

export type Amenity = $Enums.Amenity

export const Amenity: typeof $Enums.Amenity

export type PropertyType = $Enums.PropertyType

export const PropertyType: typeof $Enums.PropertyType

export type ApplicationStatus = $Enums.ApplicationStatus

export const ApplicationStatus: typeof $Enums.ApplicationStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type SafetyLevel = $Enums.SafetyLevel

export const SafetyLevel: typeof $Enums.SafetyLevel

export type GenderPreference = $Enums.GenderPreference

export const GenderPreference: typeof $Enums.GenderPreference

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Admins
 * const admins = await prisma.admin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Admins
   * const admins = await prisma.admin.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.landlord`: Exposes CRUD operations for the **Landlord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Landlords
    * const landlords = await prisma.landlord.findMany()
    * ```
    */
  get landlord(): Prisma.LandlordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tenant`: Exposes CRUD operations for the **Tenant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tenants
    * const tenants = await prisma.tenant.findMany()
    * ```
    */
  get tenant(): Prisma.TenantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.property`: Exposes CRUD operations for the **Property** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Properties
    * const properties = await prisma.property.findMany()
    * ```
    */
  get property(): Prisma.PropertyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.application`: Exposes CRUD operations for the **Application** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.application.findMany()
    * ```
    */
  get application(): Prisma.ApplicationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lease`: Exposes CRUD operations for the **Lease** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Leases
    * const leases = await prisma.lease.findMany()
    * ```
    */
  get lease(): Prisma.LeaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.safetyIndicator`: Exposes CRUD operations for the **SafetyIndicator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SafetyIndicators
    * const safetyIndicators = await prisma.safetyIndicator.findMany()
    * ```
    */
  get safetyIndicator(): Prisma.SafetyIndicatorDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Admin: 'Admin',
    Landlord: 'Landlord',
    Tenant: 'Tenant',
    Property: 'Property',
    Location: 'Location',
    Application: 'Application',
    Lease: 'Lease',
    Payment: 'Payment',
    Review: 'Review',
    SafetyIndicator: 'SafetyIndicator'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "admin" | "landlord" | "tenant" | "property" | "location" | "application" | "lease" | "payment" | "review" | "safetyIndicator"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Landlord: {
        payload: Prisma.$LandlordPayload<ExtArgs>
        fields: Prisma.LandlordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LandlordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LandlordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>
          }
          findFirst: {
            args: Prisma.LandlordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LandlordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>
          }
          findMany: {
            args: Prisma.LandlordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>[]
          }
          create: {
            args: Prisma.LandlordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>
          }
          createMany: {
            args: Prisma.LandlordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LandlordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>[]
          }
          delete: {
            args: Prisma.LandlordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>
          }
          update: {
            args: Prisma.LandlordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>
          }
          deleteMany: {
            args: Prisma.LandlordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LandlordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LandlordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>[]
          }
          upsert: {
            args: Prisma.LandlordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LandlordPayload>
          }
          aggregate: {
            args: Prisma.LandlordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLandlord>
          }
          groupBy: {
            args: Prisma.LandlordGroupByArgs<ExtArgs>
            result: $Utils.Optional<LandlordGroupByOutputType>[]
          }
          count: {
            args: Prisma.LandlordCountArgs<ExtArgs>
            result: $Utils.Optional<LandlordCountAggregateOutputType> | number
          }
        }
      }
      Tenant: {
        payload: Prisma.$TenantPayload<ExtArgs>
        fields: Prisma.TenantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TenantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TenantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findFirst: {
            args: Prisma.TenantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TenantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          findMany: {
            args: Prisma.TenantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          create: {
            args: Prisma.TenantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          createMany: {
            args: Prisma.TenantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TenantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          delete: {
            args: Prisma.TenantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          update: {
            args: Prisma.TenantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          deleteMany: {
            args: Prisma.TenantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TenantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TenantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>[]
          }
          upsert: {
            args: Prisma.TenantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TenantPayload>
          }
          aggregate: {
            args: Prisma.TenantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTenant>
          }
          groupBy: {
            args: Prisma.TenantGroupByArgs<ExtArgs>
            result: $Utils.Optional<TenantGroupByOutputType>[]
          }
          count: {
            args: Prisma.TenantCountArgs<ExtArgs>
            result: $Utils.Optional<TenantCountAggregateOutputType> | number
          }
        }
      }
      Property: {
        payload: Prisma.$PropertyPayload<ExtArgs>
        fields: Prisma.PropertyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PropertyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PropertyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findFirst: {
            args: Prisma.PropertyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PropertyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          findMany: {
            args: Prisma.PropertyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          create: {
            args: Prisma.PropertyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          createMany: {
            args: Prisma.PropertyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PropertyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          delete: {
            args: Prisma.PropertyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          update: {
            args: Prisma.PropertyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          deleteMany: {
            args: Prisma.PropertyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PropertyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PropertyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>[]
          }
          upsert: {
            args: Prisma.PropertyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PropertyPayload>
          }
          aggregate: {
            args: Prisma.PropertyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProperty>
          }
          groupBy: {
            args: Prisma.PropertyGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropertyGroupByOutputType>[]
          }
          count: {
            args: Prisma.PropertyCountArgs<ExtArgs>
            result: $Utils.Optional<PropertyCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      Application: {
        payload: Prisma.$ApplicationPayload<ExtArgs>
        fields: Prisma.ApplicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findFirst: {
            args: Prisma.ApplicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          findMany: {
            args: Prisma.ApplicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          create: {
            args: Prisma.ApplicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          createMany: {
            args: Prisma.ApplicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApplicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          delete: {
            args: Prisma.ApplicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          update: {
            args: Prisma.ApplicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApplicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>[]
          }
          upsert: {
            args: Prisma.ApplicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationPayload>
          }
          aggregate: {
            args: Prisma.ApplicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplication>
          }
          groupBy: {
            args: Prisma.ApplicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApplicationCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationCountAggregateOutputType> | number
          }
        }
      }
      Lease: {
        payload: Prisma.$LeasePayload<ExtArgs>
        fields: Prisma.LeaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LeaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LeaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>
          }
          findFirst: {
            args: Prisma.LeaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LeaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>
          }
          findMany: {
            args: Prisma.LeaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>[]
          }
          create: {
            args: Prisma.LeaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>
          }
          createMany: {
            args: Prisma.LeaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LeaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>[]
          }
          delete: {
            args: Prisma.LeaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>
          }
          update: {
            args: Prisma.LeaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>
          }
          deleteMany: {
            args: Prisma.LeaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LeaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LeaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>[]
          }
          upsert: {
            args: Prisma.LeaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LeasePayload>
          }
          aggregate: {
            args: Prisma.LeaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLease>
          }
          groupBy: {
            args: Prisma.LeaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<LeaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.LeaseCountArgs<ExtArgs>
            result: $Utils.Optional<LeaseCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReviewUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      SafetyIndicator: {
        payload: Prisma.$SafetyIndicatorPayload<ExtArgs>
        fields: Prisma.SafetyIndicatorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SafetyIndicatorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SafetyIndicatorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>
          }
          findFirst: {
            args: Prisma.SafetyIndicatorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SafetyIndicatorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>
          }
          findMany: {
            args: Prisma.SafetyIndicatorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>[]
          }
          create: {
            args: Prisma.SafetyIndicatorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>
          }
          createMany: {
            args: Prisma.SafetyIndicatorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SafetyIndicatorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>[]
          }
          delete: {
            args: Prisma.SafetyIndicatorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>
          }
          update: {
            args: Prisma.SafetyIndicatorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>
          }
          deleteMany: {
            args: Prisma.SafetyIndicatorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SafetyIndicatorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SafetyIndicatorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>[]
          }
          upsert: {
            args: Prisma.SafetyIndicatorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SafetyIndicatorPayload>
          }
          aggregate: {
            args: Prisma.SafetyIndicatorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSafetyIndicator>
          }
          groupBy: {
            args: Prisma.SafetyIndicatorGroupByArgs<ExtArgs>
            result: $Utils.Optional<SafetyIndicatorGroupByOutputType>[]
          }
          count: {
            args: Prisma.SafetyIndicatorCountArgs<ExtArgs>
            result: $Utils.Optional<SafetyIndicatorCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    admin?: AdminOmit
    landlord?: LandlordOmit
    tenant?: TenantOmit
    property?: PropertyOmit
    location?: LocationOmit
    application?: ApplicationOmit
    lease?: LeaseOmit
    payment?: PaymentOmit
    review?: ReviewOmit
    safetyIndicator?: SafetyIndicatorOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LandlordCountOutputType
   */

  export type LandlordCountOutputType = {
    properties: number
    reviews: number
  }

  export type LandlordCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | LandlordCountOutputTypeCountPropertiesArgs
    reviews?: boolean | LandlordCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * LandlordCountOutputType without action
   */
  export type LandlordCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LandlordCountOutputType
     */
    select?: LandlordCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LandlordCountOutputType without action
   */
  export type LandlordCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * LandlordCountOutputType without action
   */
  export type LandlordCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type TenantCountOutputType
   */

  export type TenantCountOutputType = {
    properties: number
    favorites: number
    applications: number
    leases: number
    reviews: number
  }

  export type TenantCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | TenantCountOutputTypeCountPropertiesArgs
    favorites?: boolean | TenantCountOutputTypeCountFavoritesArgs
    applications?: boolean | TenantCountOutputTypeCountApplicationsArgs
    leases?: boolean | TenantCountOutputTypeCountLeasesArgs
    reviews?: boolean | TenantCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TenantCountOutputType
     */
    select?: TenantCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountFavoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountLeasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaseWhereInput
  }

  /**
   * TenantCountOutputType without action
   */
  export type TenantCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type PropertyCountOutputType
   */

  export type PropertyCountOutputType = {
    leases: number
    applications: number
    favoritedBy: number
    tenants: number
  }

  export type PropertyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    leases?: boolean | PropertyCountOutputTypeCountLeasesArgs
    applications?: boolean | PropertyCountOutputTypeCountApplicationsArgs
    favoritedBy?: boolean | PropertyCountOutputTypeCountFavoritedByArgs
    tenants?: boolean | PropertyCountOutputTypeCountTenantsArgs
  }

  // Custom InputTypes
  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCountOutputType
     */
    select?: PropertyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountLeasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaseWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountFavoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
  }

  /**
   * PropertyCountOutputType without action
   */
  export type PropertyCountOutputTypeCountTenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    properties: number
    safetyIndicators: number
    reviews: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | LocationCountOutputTypeCountPropertiesArgs
    safetyIndicators?: boolean | LocationCountOutputTypeCountSafetyIndicatorsArgs
    reviews?: boolean | LocationCountOutputTypeCountReviewsArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountPropertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountSafetyIndicatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SafetyIndicatorWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }


  /**
   * Count Type LeaseCountOutputType
   */

  export type LeaseCountOutputType = {
    payments: number
  }

  export type LeaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | LeaseCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * LeaseCountOutputType without action
   */
  export type LeaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LeaseCountOutputType
     */
    select?: LeaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LeaseCountOutputType without action
   */
  export type LeaseCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminAvgAggregateOutputType = {
    id: number | null
  }

  export type AdminSumAggregateOutputType = {
    id: number | null
  }

  export type AdminMinAggregateOutputType = {
    id: number | null
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    superUser: boolean | null
  }

  export type AdminMaxAggregateOutputType = {
    id: number | null
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    superUser: boolean | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    cognitoId: number
    name: number
    email: number
    phoneNumber: number
    superUser: number
    _all: number
  }


  export type AdminAvgAggregateInputType = {
    id?: true
  }

  export type AdminSumAggregateInputType = {
    id?: true
  }

  export type AdminMinAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    superUser?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    superUser?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    superUser?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdminAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdminSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _avg?: AdminAvgAggregateInputType
    _sum?: AdminSumAggregateInputType
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    superUser: boolean
    _count: AdminCountAggregateOutputType | null
    _avg: AdminAvgAggregateOutputType | null
    _sum: AdminSumAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    superUser?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    superUser?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    superUser?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    superUser?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cognitoId" | "name" | "email" | "phoneNumber" | "superUser", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cognitoId: string
      name: string
      email: string
      phoneNumber: string
      superUser: boolean
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'Int'>
    readonly cognitoId: FieldRef<"Admin", 'String'>
    readonly name: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly phoneNumber: FieldRef<"Admin", 'String'>
    readonly superUser: FieldRef<"Admin", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model Landlord
   */

  export type AggregateLandlord = {
    _count: LandlordCountAggregateOutputType | null
    _avg: LandlordAvgAggregateOutputType | null
    _sum: LandlordSumAggregateOutputType | null
    _min: LandlordMinAggregateOutputType | null
    _max: LandlordMaxAggregateOutputType | null
  }

  export type LandlordAvgAggregateOutputType = {
    id: number | null
  }

  export type LandlordSumAggregateOutputType = {
    id: number | null
  }

  export type LandlordMinAggregateOutputType = {
    id: number | null
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
  }

  export type LandlordMaxAggregateOutputType = {
    id: number | null
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
  }

  export type LandlordCountAggregateOutputType = {
    id: number
    cognitoId: number
    name: number
    email: number
    phoneNumber: number
    _all: number
  }


  export type LandlordAvgAggregateInputType = {
    id?: true
  }

  export type LandlordSumAggregateInputType = {
    id?: true
  }

  export type LandlordMinAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
  }

  export type LandlordMaxAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
  }

  export type LandlordCountAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    _all?: true
  }

  export type LandlordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Landlord to aggregate.
     */
    where?: LandlordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landlords to fetch.
     */
    orderBy?: LandlordOrderByWithRelationInput | LandlordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LandlordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landlords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landlords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Landlords
    **/
    _count?: true | LandlordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LandlordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LandlordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LandlordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LandlordMaxAggregateInputType
  }

  export type GetLandlordAggregateType<T extends LandlordAggregateArgs> = {
        [P in keyof T & keyof AggregateLandlord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLandlord[P]>
      : GetScalarType<T[P], AggregateLandlord[P]>
  }




  export type LandlordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LandlordWhereInput
    orderBy?: LandlordOrderByWithAggregationInput | LandlordOrderByWithAggregationInput[]
    by: LandlordScalarFieldEnum[] | LandlordScalarFieldEnum
    having?: LandlordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LandlordCountAggregateInputType | true
    _avg?: LandlordAvgAggregateInputType
    _sum?: LandlordSumAggregateInputType
    _min?: LandlordMinAggregateInputType
    _max?: LandlordMaxAggregateInputType
  }

  export type LandlordGroupByOutputType = {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    _count: LandlordCountAggregateOutputType | null
    _avg: LandlordAvgAggregateOutputType | null
    _sum: LandlordSumAggregateOutputType | null
    _min: LandlordMinAggregateOutputType | null
    _max: LandlordMaxAggregateOutputType | null
  }

  type GetLandlordGroupByPayload<T extends LandlordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LandlordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LandlordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LandlordGroupByOutputType[P]>
            : GetScalarType<T[P], LandlordGroupByOutputType[P]>
        }
      >
    >


  export type LandlordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    properties?: boolean | Landlord$propertiesArgs<ExtArgs>
    reviews?: boolean | Landlord$reviewsArgs<ExtArgs>
    _count?: boolean | LandlordCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["landlord"]>

  export type LandlordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["landlord"]>

  export type LandlordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["landlord"]>

  export type LandlordSelectScalar = {
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
  }

  export type LandlordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cognitoId" | "name" | "email" | "phoneNumber", ExtArgs["result"]["landlord"]>
  export type LandlordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | Landlord$propertiesArgs<ExtArgs>
    reviews?: boolean | Landlord$reviewsArgs<ExtArgs>
    _count?: boolean | LandlordCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LandlordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LandlordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LandlordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Landlord"
    objects: {
      properties: Prisma.$PropertyPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cognitoId: string
      name: string
      email: string
      phoneNumber: string
    }, ExtArgs["result"]["landlord"]>
    composites: {}
  }

  type LandlordGetPayload<S extends boolean | null | undefined | LandlordDefaultArgs> = $Result.GetResult<Prisma.$LandlordPayload, S>

  type LandlordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LandlordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LandlordCountAggregateInputType | true
    }

  export interface LandlordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Landlord'], meta: { name: 'Landlord' } }
    /**
     * Find zero or one Landlord that matches the filter.
     * @param {LandlordFindUniqueArgs} args - Arguments to find a Landlord
     * @example
     * // Get one Landlord
     * const landlord = await prisma.landlord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LandlordFindUniqueArgs>(args: SelectSubset<T, LandlordFindUniqueArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Landlord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LandlordFindUniqueOrThrowArgs} args - Arguments to find a Landlord
     * @example
     * // Get one Landlord
     * const landlord = await prisma.landlord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LandlordFindUniqueOrThrowArgs>(args: SelectSubset<T, LandlordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Landlord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordFindFirstArgs} args - Arguments to find a Landlord
     * @example
     * // Get one Landlord
     * const landlord = await prisma.landlord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LandlordFindFirstArgs>(args?: SelectSubset<T, LandlordFindFirstArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Landlord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordFindFirstOrThrowArgs} args - Arguments to find a Landlord
     * @example
     * // Get one Landlord
     * const landlord = await prisma.landlord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LandlordFindFirstOrThrowArgs>(args?: SelectSubset<T, LandlordFindFirstOrThrowArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Landlords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Landlords
     * const landlords = await prisma.landlord.findMany()
     * 
     * // Get first 10 Landlords
     * const landlords = await prisma.landlord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const landlordWithIdOnly = await prisma.landlord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LandlordFindManyArgs>(args?: SelectSubset<T, LandlordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Landlord.
     * @param {LandlordCreateArgs} args - Arguments to create a Landlord.
     * @example
     * // Create one Landlord
     * const Landlord = await prisma.landlord.create({
     *   data: {
     *     // ... data to create a Landlord
     *   }
     * })
     * 
     */
    create<T extends LandlordCreateArgs>(args: SelectSubset<T, LandlordCreateArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Landlords.
     * @param {LandlordCreateManyArgs} args - Arguments to create many Landlords.
     * @example
     * // Create many Landlords
     * const landlord = await prisma.landlord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LandlordCreateManyArgs>(args?: SelectSubset<T, LandlordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Landlords and returns the data saved in the database.
     * @param {LandlordCreateManyAndReturnArgs} args - Arguments to create many Landlords.
     * @example
     * // Create many Landlords
     * const landlord = await prisma.landlord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Landlords and only return the `id`
     * const landlordWithIdOnly = await prisma.landlord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LandlordCreateManyAndReturnArgs>(args?: SelectSubset<T, LandlordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Landlord.
     * @param {LandlordDeleteArgs} args - Arguments to delete one Landlord.
     * @example
     * // Delete one Landlord
     * const Landlord = await prisma.landlord.delete({
     *   where: {
     *     // ... filter to delete one Landlord
     *   }
     * })
     * 
     */
    delete<T extends LandlordDeleteArgs>(args: SelectSubset<T, LandlordDeleteArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Landlord.
     * @param {LandlordUpdateArgs} args - Arguments to update one Landlord.
     * @example
     * // Update one Landlord
     * const landlord = await prisma.landlord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LandlordUpdateArgs>(args: SelectSubset<T, LandlordUpdateArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Landlords.
     * @param {LandlordDeleteManyArgs} args - Arguments to filter Landlords to delete.
     * @example
     * // Delete a few Landlords
     * const { count } = await prisma.landlord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LandlordDeleteManyArgs>(args?: SelectSubset<T, LandlordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Landlords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Landlords
     * const landlord = await prisma.landlord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LandlordUpdateManyArgs>(args: SelectSubset<T, LandlordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Landlords and returns the data updated in the database.
     * @param {LandlordUpdateManyAndReturnArgs} args - Arguments to update many Landlords.
     * @example
     * // Update many Landlords
     * const landlord = await prisma.landlord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Landlords and only return the `id`
     * const landlordWithIdOnly = await prisma.landlord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LandlordUpdateManyAndReturnArgs>(args: SelectSubset<T, LandlordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Landlord.
     * @param {LandlordUpsertArgs} args - Arguments to update or create a Landlord.
     * @example
     * // Update or create a Landlord
     * const landlord = await prisma.landlord.upsert({
     *   create: {
     *     // ... data to create a Landlord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Landlord we want to update
     *   }
     * })
     */
    upsert<T extends LandlordUpsertArgs>(args: SelectSubset<T, LandlordUpsertArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Landlords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordCountArgs} args - Arguments to filter Landlords to count.
     * @example
     * // Count the number of Landlords
     * const count = await prisma.landlord.count({
     *   where: {
     *     // ... the filter for the Landlords we want to count
     *   }
     * })
    **/
    count<T extends LandlordCountArgs>(
      args?: Subset<T, LandlordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LandlordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Landlord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LandlordAggregateArgs>(args: Subset<T, LandlordAggregateArgs>): Prisma.PrismaPromise<GetLandlordAggregateType<T>>

    /**
     * Group by Landlord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LandlordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LandlordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LandlordGroupByArgs['orderBy'] }
        : { orderBy?: LandlordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LandlordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLandlordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Landlord model
   */
  readonly fields: LandlordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Landlord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LandlordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    properties<T extends Landlord$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, Landlord$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Landlord$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Landlord$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Landlord model
   */
  interface LandlordFieldRefs {
    readonly id: FieldRef<"Landlord", 'Int'>
    readonly cognitoId: FieldRef<"Landlord", 'String'>
    readonly name: FieldRef<"Landlord", 'String'>
    readonly email: FieldRef<"Landlord", 'String'>
    readonly phoneNumber: FieldRef<"Landlord", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Landlord findUnique
   */
  export type LandlordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * Filter, which Landlord to fetch.
     */
    where: LandlordWhereUniqueInput
  }

  /**
   * Landlord findUniqueOrThrow
   */
  export type LandlordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * Filter, which Landlord to fetch.
     */
    where: LandlordWhereUniqueInput
  }

  /**
   * Landlord findFirst
   */
  export type LandlordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * Filter, which Landlord to fetch.
     */
    where?: LandlordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landlords to fetch.
     */
    orderBy?: LandlordOrderByWithRelationInput | LandlordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Landlords.
     */
    cursor?: LandlordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landlords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landlords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Landlords.
     */
    distinct?: LandlordScalarFieldEnum | LandlordScalarFieldEnum[]
  }

  /**
   * Landlord findFirstOrThrow
   */
  export type LandlordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * Filter, which Landlord to fetch.
     */
    where?: LandlordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landlords to fetch.
     */
    orderBy?: LandlordOrderByWithRelationInput | LandlordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Landlords.
     */
    cursor?: LandlordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landlords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landlords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Landlords.
     */
    distinct?: LandlordScalarFieldEnum | LandlordScalarFieldEnum[]
  }

  /**
   * Landlord findMany
   */
  export type LandlordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * Filter, which Landlords to fetch.
     */
    where?: LandlordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Landlords to fetch.
     */
    orderBy?: LandlordOrderByWithRelationInput | LandlordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Landlords.
     */
    cursor?: LandlordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Landlords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Landlords.
     */
    skip?: number
    distinct?: LandlordScalarFieldEnum | LandlordScalarFieldEnum[]
  }

  /**
   * Landlord create
   */
  export type LandlordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * The data needed to create a Landlord.
     */
    data: XOR<LandlordCreateInput, LandlordUncheckedCreateInput>
  }

  /**
   * Landlord createMany
   */
  export type LandlordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Landlords.
     */
    data: LandlordCreateManyInput | LandlordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Landlord createManyAndReturn
   */
  export type LandlordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * The data used to create many Landlords.
     */
    data: LandlordCreateManyInput | LandlordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Landlord update
   */
  export type LandlordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * The data needed to update a Landlord.
     */
    data: XOR<LandlordUpdateInput, LandlordUncheckedUpdateInput>
    /**
     * Choose, which Landlord to update.
     */
    where: LandlordWhereUniqueInput
  }

  /**
   * Landlord updateMany
   */
  export type LandlordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Landlords.
     */
    data: XOR<LandlordUpdateManyMutationInput, LandlordUncheckedUpdateManyInput>
    /**
     * Filter which Landlords to update
     */
    where?: LandlordWhereInput
    /**
     * Limit how many Landlords to update.
     */
    limit?: number
  }

  /**
   * Landlord updateManyAndReturn
   */
  export type LandlordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * The data used to update Landlords.
     */
    data: XOR<LandlordUpdateManyMutationInput, LandlordUncheckedUpdateManyInput>
    /**
     * Filter which Landlords to update
     */
    where?: LandlordWhereInput
    /**
     * Limit how many Landlords to update.
     */
    limit?: number
  }

  /**
   * Landlord upsert
   */
  export type LandlordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * The filter to search for the Landlord to update in case it exists.
     */
    where: LandlordWhereUniqueInput
    /**
     * In case the Landlord found by the `where` argument doesn't exist, create a new Landlord with this data.
     */
    create: XOR<LandlordCreateInput, LandlordUncheckedCreateInput>
    /**
     * In case the Landlord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LandlordUpdateInput, LandlordUncheckedUpdateInput>
  }

  /**
   * Landlord delete
   */
  export type LandlordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
    /**
     * Filter which Landlord to delete.
     */
    where: LandlordWhereUniqueInput
  }

  /**
   * Landlord deleteMany
   */
  export type LandlordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Landlords to delete
     */
    where?: LandlordWhereInput
    /**
     * Limit how many Landlords to delete.
     */
    limit?: number
  }

  /**
   * Landlord.properties
   */
  export type Landlord$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Landlord.reviews
   */
  export type Landlord$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Landlord without action
   */
  export type LandlordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Landlord
     */
    select?: LandlordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Landlord
     */
    omit?: LandlordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LandlordInclude<ExtArgs> | null
  }


  /**
   * Model Tenant
   */

  export type AggregateTenant = {
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  export type TenantAvgAggregateOutputType = {
    id: number | null
  }

  export type TenantSumAggregateOutputType = {
    id: number | null
  }

  export type TenantMinAggregateOutputType = {
    id: number | null
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
  }

  export type TenantMaxAggregateOutputType = {
    id: number | null
    cognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
  }

  export type TenantCountAggregateOutputType = {
    id: number
    cognitoId: number
    name: number
    email: number
    phoneNumber: number
    _all: number
  }


  export type TenantAvgAggregateInputType = {
    id?: true
  }

  export type TenantSumAggregateInputType = {
    id?: true
  }

  export type TenantMinAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
  }

  export type TenantMaxAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
  }

  export type TenantCountAggregateInputType = {
    id?: true
    cognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    _all?: true
  }

  export type TenantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenant to aggregate.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tenants
    **/
    _count?: true | TenantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TenantAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TenantSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TenantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TenantMaxAggregateInputType
  }

  export type GetTenantAggregateType<T extends TenantAggregateArgs> = {
        [P in keyof T & keyof AggregateTenant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTenant[P]>
      : GetScalarType<T[P], AggregateTenant[P]>
  }




  export type TenantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithAggregationInput | TenantOrderByWithAggregationInput[]
    by: TenantScalarFieldEnum[] | TenantScalarFieldEnum
    having?: TenantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TenantCountAggregateInputType | true
    _avg?: TenantAvgAggregateInputType
    _sum?: TenantSumAggregateInputType
    _min?: TenantMinAggregateInputType
    _max?: TenantMaxAggregateInputType
  }

  export type TenantGroupByOutputType = {
    id: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    _count: TenantCountAggregateOutputType | null
    _avg: TenantAvgAggregateOutputType | null
    _sum: TenantSumAggregateOutputType | null
    _min: TenantMinAggregateOutputType | null
    _max: TenantMaxAggregateOutputType | null
  }

  type GetTenantGroupByPayload<T extends TenantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TenantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TenantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TenantGroupByOutputType[P]>
            : GetScalarType<T[P], TenantGroupByOutputType[P]>
        }
      >
    >


  export type TenantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    properties?: boolean | Tenant$propertiesArgs<ExtArgs>
    favorites?: boolean | Tenant$favoritesArgs<ExtArgs>
    applications?: boolean | Tenant$applicationsArgs<ExtArgs>
    leases?: boolean | Tenant$leasesArgs<ExtArgs>
    reviews?: boolean | Tenant$reviewsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["tenant"]>

  export type TenantSelectScalar = {
    id?: boolean
    cognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
  }

  export type TenantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cognitoId" | "name" | "email" | "phoneNumber", ExtArgs["result"]["tenant"]>
  export type TenantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | Tenant$propertiesArgs<ExtArgs>
    favorites?: boolean | Tenant$favoritesArgs<ExtArgs>
    applications?: boolean | Tenant$applicationsArgs<ExtArgs>
    leases?: boolean | Tenant$leasesArgs<ExtArgs>
    reviews?: boolean | Tenant$reviewsArgs<ExtArgs>
    _count?: boolean | TenantCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TenantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TenantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TenantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tenant"
    objects: {
      properties: Prisma.$PropertyPayload<ExtArgs>[]
      favorites: Prisma.$PropertyPayload<ExtArgs>[]
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      leases: Prisma.$LeasePayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      cognitoId: string
      name: string
      email: string
      phoneNumber: string
    }, ExtArgs["result"]["tenant"]>
    composites: {}
  }

  type TenantGetPayload<S extends boolean | null | undefined | TenantDefaultArgs> = $Result.GetResult<Prisma.$TenantPayload, S>

  type TenantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TenantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TenantCountAggregateInputType | true
    }

  export interface TenantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tenant'], meta: { name: 'Tenant' } }
    /**
     * Find zero or one Tenant that matches the filter.
     * @param {TenantFindUniqueArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TenantFindUniqueArgs>(args: SelectSubset<T, TenantFindUniqueArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tenant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TenantFindUniqueOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TenantFindUniqueOrThrowArgs>(args: SelectSubset<T, TenantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TenantFindFirstArgs>(args?: SelectSubset<T, TenantFindFirstArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tenant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindFirstOrThrowArgs} args - Arguments to find a Tenant
     * @example
     * // Get one Tenant
     * const tenant = await prisma.tenant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TenantFindFirstOrThrowArgs>(args?: SelectSubset<T, TenantFindFirstOrThrowArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tenants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tenants
     * const tenants = await prisma.tenant.findMany()
     * 
     * // Get first 10 Tenants
     * const tenants = await prisma.tenant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tenantWithIdOnly = await prisma.tenant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TenantFindManyArgs>(args?: SelectSubset<T, TenantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tenant.
     * @param {TenantCreateArgs} args - Arguments to create a Tenant.
     * @example
     * // Create one Tenant
     * const Tenant = await prisma.tenant.create({
     *   data: {
     *     // ... data to create a Tenant
     *   }
     * })
     * 
     */
    create<T extends TenantCreateArgs>(args: SelectSubset<T, TenantCreateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tenants.
     * @param {TenantCreateManyArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TenantCreateManyArgs>(args?: SelectSubset<T, TenantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tenants and returns the data saved in the database.
     * @param {TenantCreateManyAndReturnArgs} args - Arguments to create many Tenants.
     * @example
     * // Create many Tenants
     * const tenant = await prisma.tenant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TenantCreateManyAndReturnArgs>(args?: SelectSubset<T, TenantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tenant.
     * @param {TenantDeleteArgs} args - Arguments to delete one Tenant.
     * @example
     * // Delete one Tenant
     * const Tenant = await prisma.tenant.delete({
     *   where: {
     *     // ... filter to delete one Tenant
     *   }
     * })
     * 
     */
    delete<T extends TenantDeleteArgs>(args: SelectSubset<T, TenantDeleteArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tenant.
     * @param {TenantUpdateArgs} args - Arguments to update one Tenant.
     * @example
     * // Update one Tenant
     * const tenant = await prisma.tenant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TenantUpdateArgs>(args: SelectSubset<T, TenantUpdateArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tenants.
     * @param {TenantDeleteManyArgs} args - Arguments to filter Tenants to delete.
     * @example
     * // Delete a few Tenants
     * const { count } = await prisma.tenant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TenantDeleteManyArgs>(args?: SelectSubset<T, TenantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TenantUpdateManyArgs>(args: SelectSubset<T, TenantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tenants and returns the data updated in the database.
     * @param {TenantUpdateManyAndReturnArgs} args - Arguments to update many Tenants.
     * @example
     * // Update many Tenants
     * const tenant = await prisma.tenant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tenants and only return the `id`
     * const tenantWithIdOnly = await prisma.tenant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TenantUpdateManyAndReturnArgs>(args: SelectSubset<T, TenantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tenant.
     * @param {TenantUpsertArgs} args - Arguments to update or create a Tenant.
     * @example
     * // Update or create a Tenant
     * const tenant = await prisma.tenant.upsert({
     *   create: {
     *     // ... data to create a Tenant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tenant we want to update
     *   }
     * })
     */
    upsert<T extends TenantUpsertArgs>(args: SelectSubset<T, TenantUpsertArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tenants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantCountArgs} args - Arguments to filter Tenants to count.
     * @example
     * // Count the number of Tenants
     * const count = await prisma.tenant.count({
     *   where: {
     *     // ... the filter for the Tenants we want to count
     *   }
     * })
    **/
    count<T extends TenantCountArgs>(
      args?: Subset<T, TenantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TenantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TenantAggregateArgs>(args: Subset<T, TenantAggregateArgs>): Prisma.PrismaPromise<GetTenantAggregateType<T>>

    /**
     * Group by Tenant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TenantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TenantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TenantGroupByArgs['orderBy'] }
        : { orderBy?: TenantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TenantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTenantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tenant model
   */
  readonly fields: TenantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tenant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TenantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    properties<T extends Tenant$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favorites<T extends Tenant$favoritesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$favoritesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends Tenant$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    leases<T extends Tenant$leasesArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$leasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Tenant$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Tenant$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tenant model
   */
  interface TenantFieldRefs {
    readonly id: FieldRef<"Tenant", 'Int'>
    readonly cognitoId: FieldRef<"Tenant", 'String'>
    readonly name: FieldRef<"Tenant", 'String'>
    readonly email: FieldRef<"Tenant", 'String'>
    readonly phoneNumber: FieldRef<"Tenant", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tenant findUnique
   */
  export type TenantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findUniqueOrThrow
   */
  export type TenantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant findFirst
   */
  export type TenantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findFirstOrThrow
   */
  export type TenantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenant to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tenants.
     */
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant findMany
   */
  export type TenantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter, which Tenants to fetch.
     */
    where?: TenantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tenants to fetch.
     */
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tenants.
     */
    cursor?: TenantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tenants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tenants.
     */
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Tenant create
   */
  export type TenantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to create a Tenant.
     */
    data: XOR<TenantCreateInput, TenantUncheckedCreateInput>
  }

  /**
   * Tenant createMany
   */
  export type TenantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant createManyAndReturn
   */
  export type TenantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to create many Tenants.
     */
    data: TenantCreateManyInput | TenantCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tenant update
   */
  export type TenantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The data needed to update a Tenant.
     */
    data: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
    /**
     * Choose, which Tenant to update.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant updateMany
   */
  export type TenantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant updateManyAndReturn
   */
  export type TenantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * The data used to update Tenants.
     */
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyInput>
    /**
     * Filter which Tenants to update
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to update.
     */
    limit?: number
  }

  /**
   * Tenant upsert
   */
  export type TenantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * The filter to search for the Tenant to update in case it exists.
     */
    where: TenantWhereUniqueInput
    /**
     * In case the Tenant found by the `where` argument doesn't exist, create a new Tenant with this data.
     */
    create: XOR<TenantCreateInput, TenantUncheckedCreateInput>
    /**
     * In case the Tenant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TenantUpdateInput, TenantUncheckedUpdateInput>
  }

  /**
   * Tenant delete
   */
  export type TenantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    /**
     * Filter which Tenant to delete.
     */
    where: TenantWhereUniqueInput
  }

  /**
   * Tenant deleteMany
   */
  export type TenantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tenants to delete
     */
    where?: TenantWhereInput
    /**
     * Limit how many Tenants to delete.
     */
    limit?: number
  }

  /**
   * Tenant.properties
   */
  export type Tenant$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Tenant.favorites
   */
  export type Tenant$favoritesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Tenant.applications
   */
  export type Tenant$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Tenant.leases
   */
  export type Tenant$leasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    where?: LeaseWhereInput
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[]
    cursor?: LeaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[]
  }

  /**
   * Tenant.reviews
   */
  export type Tenant$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Tenant without action
   */
  export type TenantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
  }


  /**
   * Model Property
   */

  export type AggregateProperty = {
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  export type PropertyAvgAggregateOutputType = {
    id: number | null
    pricePerMonth: number | null
    securityDeposit: number | null
    applicationFee: number | null
    beds: number | null
    baths: number | null
    squareFeet: number | null
    averageRating: number | null
    numberOfReviews: number | null
    locationId: number | null
  }

  export type PropertySumAggregateOutputType = {
    id: number | null
    pricePerMonth: number | null
    securityDeposit: number | null
    applicationFee: number | null
    beds: number | null
    baths: number | null
    squareFeet: number | null
    averageRating: number | null
    numberOfReviews: number | null
    locationId: number | null
  }

  export type PropertyMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    pricePerMonth: number | null
    securityDeposit: number | null
    applicationFee: number | null
    isPetsAllowed: boolean | null
    isParkingIncluded: boolean | null
    isBachelorFriendly: boolean | null
    isFemaleOnly: boolean | null
    genderPreference: $Enums.GenderPreference | null
    beds: number | null
    baths: number | null
    squareFeet: number | null
    propertyType: $Enums.PropertyType | null
    postedDate: Date | null
    averageRating: number | null
    numberOfReviews: number | null
    locationId: number | null
    landlordCognitoId: string | null
  }

  export type PropertyMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    pricePerMonth: number | null
    securityDeposit: number | null
    applicationFee: number | null
    isPetsAllowed: boolean | null
    isParkingIncluded: boolean | null
    isBachelorFriendly: boolean | null
    isFemaleOnly: boolean | null
    genderPreference: $Enums.GenderPreference | null
    beds: number | null
    baths: number | null
    squareFeet: number | null
    propertyType: $Enums.PropertyType | null
    postedDate: Date | null
    averageRating: number | null
    numberOfReviews: number | null
    locationId: number | null
    landlordCognitoId: string | null
  }

  export type PropertyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls: number
    amenities: number
    highlights: number
    isPetsAllowed: number
    isParkingIncluded: number
    isBachelorFriendly: number
    isFemaleOnly: number
    genderPreference: number
    beds: number
    baths: number
    squareFeet: number
    propertyType: number
    postedDate: number
    averageRating: number
    numberOfReviews: number
    locationId: number
    landlordCognitoId: number
    _all: number
  }


  export type PropertyAvgAggregateInputType = {
    id?: true
    pricePerMonth?: true
    securityDeposit?: true
    applicationFee?: true
    beds?: true
    baths?: true
    squareFeet?: true
    averageRating?: true
    numberOfReviews?: true
    locationId?: true
  }

  export type PropertySumAggregateInputType = {
    id?: true
    pricePerMonth?: true
    securityDeposit?: true
    applicationFee?: true
    beds?: true
    baths?: true
    squareFeet?: true
    averageRating?: true
    numberOfReviews?: true
    locationId?: true
  }

  export type PropertyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    pricePerMonth?: true
    securityDeposit?: true
    applicationFee?: true
    isPetsAllowed?: true
    isParkingIncluded?: true
    isBachelorFriendly?: true
    isFemaleOnly?: true
    genderPreference?: true
    beds?: true
    baths?: true
    squareFeet?: true
    propertyType?: true
    postedDate?: true
    averageRating?: true
    numberOfReviews?: true
    locationId?: true
    landlordCognitoId?: true
  }

  export type PropertyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    pricePerMonth?: true
    securityDeposit?: true
    applicationFee?: true
    isPetsAllowed?: true
    isParkingIncluded?: true
    isBachelorFriendly?: true
    isFemaleOnly?: true
    genderPreference?: true
    beds?: true
    baths?: true
    squareFeet?: true
    propertyType?: true
    postedDate?: true
    averageRating?: true
    numberOfReviews?: true
    locationId?: true
    landlordCognitoId?: true
  }

  export type PropertyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    pricePerMonth?: true
    securityDeposit?: true
    applicationFee?: true
    photoUrls?: true
    amenities?: true
    highlights?: true
    isPetsAllowed?: true
    isParkingIncluded?: true
    isBachelorFriendly?: true
    isFemaleOnly?: true
    genderPreference?: true
    beds?: true
    baths?: true
    squareFeet?: true
    propertyType?: true
    postedDate?: true
    averageRating?: true
    numberOfReviews?: true
    locationId?: true
    landlordCognitoId?: true
    _all?: true
  }

  export type PropertyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Property to aggregate.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Properties
    **/
    _count?: true | PropertyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropertyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropertySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropertyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropertyMaxAggregateInputType
  }

  export type GetPropertyAggregateType<T extends PropertyAggregateArgs> = {
        [P in keyof T & keyof AggregateProperty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProperty[P]>
      : GetScalarType<T[P], AggregateProperty[P]>
  }




  export type PropertyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithAggregationInput | PropertyOrderByWithAggregationInput[]
    by: PropertyScalarFieldEnum[] | PropertyScalarFieldEnum
    having?: PropertyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropertyCountAggregateInputType | true
    _avg?: PropertyAvgAggregateInputType
    _sum?: PropertySumAggregateInputType
    _min?: PropertyMinAggregateInputType
    _max?: PropertyMaxAggregateInputType
  }

  export type PropertyGroupByOutputType = {
    id: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls: string[]
    amenities: $Enums.Amenity[]
    highlights: $Enums.Highlight[]
    isPetsAllowed: boolean
    isParkingIncluded: boolean
    isBachelorFriendly: boolean
    isFemaleOnly: boolean
    genderPreference: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate: Date
    averageRating: number | null
    numberOfReviews: number | null
    locationId: number
    landlordCognitoId: string
    _count: PropertyCountAggregateOutputType | null
    _avg: PropertyAvgAggregateOutputType | null
    _sum: PropertySumAggregateOutputType | null
    _min: PropertyMinAggregateOutputType | null
    _max: PropertyMaxAggregateOutputType | null
  }

  type GetPropertyGroupByPayload<T extends PropertyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropertyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropertyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropertyGroupByOutputType[P]>
            : GetScalarType<T[P], PropertyGroupByOutputType[P]>
        }
      >
    >


  export type PropertySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    pricePerMonth?: boolean
    securityDeposit?: boolean
    applicationFee?: boolean
    photoUrls?: boolean
    amenities?: boolean
    highlights?: boolean
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: boolean
    beds?: boolean
    baths?: boolean
    squareFeet?: boolean
    propertyType?: boolean
    postedDate?: boolean
    averageRating?: boolean
    numberOfReviews?: boolean
    locationId?: boolean
    landlordCognitoId?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    leases?: boolean | Property$leasesArgs<ExtArgs>
    applications?: boolean | Property$applicationsArgs<ExtArgs>
    favoritedBy?: boolean | Property$favoritedByArgs<ExtArgs>
    tenants?: boolean | Property$tenantsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    pricePerMonth?: boolean
    securityDeposit?: boolean
    applicationFee?: boolean
    photoUrls?: boolean
    amenities?: boolean
    highlights?: boolean
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: boolean
    beds?: boolean
    baths?: boolean
    squareFeet?: boolean
    propertyType?: boolean
    postedDate?: boolean
    averageRating?: boolean
    numberOfReviews?: boolean
    locationId?: boolean
    landlordCognitoId?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    pricePerMonth?: boolean
    securityDeposit?: boolean
    applicationFee?: boolean
    photoUrls?: boolean
    amenities?: boolean
    highlights?: boolean
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: boolean
    beds?: boolean
    baths?: boolean
    squareFeet?: boolean
    propertyType?: boolean
    postedDate?: boolean
    averageRating?: boolean
    numberOfReviews?: boolean
    locationId?: boolean
    landlordCognitoId?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["property"]>

  export type PropertySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    pricePerMonth?: boolean
    securityDeposit?: boolean
    applicationFee?: boolean
    photoUrls?: boolean
    amenities?: boolean
    highlights?: boolean
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: boolean
    beds?: boolean
    baths?: boolean
    squareFeet?: boolean
    propertyType?: boolean
    postedDate?: boolean
    averageRating?: boolean
    numberOfReviews?: boolean
    locationId?: boolean
    landlordCognitoId?: boolean
  }

  export type PropertyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "pricePerMonth" | "securityDeposit" | "applicationFee" | "photoUrls" | "amenities" | "highlights" | "isPetsAllowed" | "isParkingIncluded" | "isBachelorFriendly" | "isFemaleOnly" | "genderPreference" | "beds" | "baths" | "squareFeet" | "propertyType" | "postedDate" | "averageRating" | "numberOfReviews" | "locationId" | "landlordCognitoId", ExtArgs["result"]["property"]>
  export type PropertyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    leases?: boolean | Property$leasesArgs<ExtArgs>
    applications?: boolean | Property$applicationsArgs<ExtArgs>
    favoritedBy?: boolean | Property$favoritedByArgs<ExtArgs>
    tenants?: boolean | Property$tenantsArgs<ExtArgs>
    _count?: boolean | PropertyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
  }
  export type PropertyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
  }

  export type $PropertyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Property"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
      landlord: Prisma.$LandlordPayload<ExtArgs>
      leases: Prisma.$LeasePayload<ExtArgs>[]
      applications: Prisma.$ApplicationPayload<ExtArgs>[]
      favoritedBy: Prisma.$TenantPayload<ExtArgs>[]
      tenants: Prisma.$TenantPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string
      pricePerMonth: number
      securityDeposit: number
      applicationFee: number
      photoUrls: string[]
      amenities: $Enums.Amenity[]
      highlights: $Enums.Highlight[]
      isPetsAllowed: boolean
      isParkingIncluded: boolean
      isBachelorFriendly: boolean
      isFemaleOnly: boolean
      genderPreference: $Enums.GenderPreference | null
      beds: number
      baths: number
      squareFeet: number
      propertyType: $Enums.PropertyType
      postedDate: Date
      averageRating: number | null
      numberOfReviews: number | null
      locationId: number
      landlordCognitoId: string
    }, ExtArgs["result"]["property"]>
    composites: {}
  }

  type PropertyGetPayload<S extends boolean | null | undefined | PropertyDefaultArgs> = $Result.GetResult<Prisma.$PropertyPayload, S>

  type PropertyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PropertyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropertyCountAggregateInputType | true
    }

  export interface PropertyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Property'], meta: { name: 'Property' } }
    /**
     * Find zero or one Property that matches the filter.
     * @param {PropertyFindUniqueArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PropertyFindUniqueArgs>(args: SelectSubset<T, PropertyFindUniqueArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Property that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PropertyFindUniqueOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PropertyFindUniqueOrThrowArgs>(args: SelectSubset<T, PropertyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PropertyFindFirstArgs>(args?: SelectSubset<T, PropertyFindFirstArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Property that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindFirstOrThrowArgs} args - Arguments to find a Property
     * @example
     * // Get one Property
     * const property = await prisma.property.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PropertyFindFirstOrThrowArgs>(args?: SelectSubset<T, PropertyFindFirstOrThrowArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Properties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Properties
     * const properties = await prisma.property.findMany()
     * 
     * // Get first 10 Properties
     * const properties = await prisma.property.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propertyWithIdOnly = await prisma.property.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PropertyFindManyArgs>(args?: SelectSubset<T, PropertyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Property.
     * @param {PropertyCreateArgs} args - Arguments to create a Property.
     * @example
     * // Create one Property
     * const Property = await prisma.property.create({
     *   data: {
     *     // ... data to create a Property
     *   }
     * })
     * 
     */
    create<T extends PropertyCreateArgs>(args: SelectSubset<T, PropertyCreateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Properties.
     * @param {PropertyCreateManyArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PropertyCreateManyArgs>(args?: SelectSubset<T, PropertyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Properties and returns the data saved in the database.
     * @param {PropertyCreateManyAndReturnArgs} args - Arguments to create many Properties.
     * @example
     * // Create many Properties
     * const property = await prisma.property.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PropertyCreateManyAndReturnArgs>(args?: SelectSubset<T, PropertyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Property.
     * @param {PropertyDeleteArgs} args - Arguments to delete one Property.
     * @example
     * // Delete one Property
     * const Property = await prisma.property.delete({
     *   where: {
     *     // ... filter to delete one Property
     *   }
     * })
     * 
     */
    delete<T extends PropertyDeleteArgs>(args: SelectSubset<T, PropertyDeleteArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Property.
     * @param {PropertyUpdateArgs} args - Arguments to update one Property.
     * @example
     * // Update one Property
     * const property = await prisma.property.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PropertyUpdateArgs>(args: SelectSubset<T, PropertyUpdateArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Properties.
     * @param {PropertyDeleteManyArgs} args - Arguments to filter Properties to delete.
     * @example
     * // Delete a few Properties
     * const { count } = await prisma.property.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PropertyDeleteManyArgs>(args?: SelectSubset<T, PropertyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PropertyUpdateManyArgs>(args: SelectSubset<T, PropertyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Properties and returns the data updated in the database.
     * @param {PropertyUpdateManyAndReturnArgs} args - Arguments to update many Properties.
     * @example
     * // Update many Properties
     * const property = await prisma.property.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Properties and only return the `id`
     * const propertyWithIdOnly = await prisma.property.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PropertyUpdateManyAndReturnArgs>(args: SelectSubset<T, PropertyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Property.
     * @param {PropertyUpsertArgs} args - Arguments to update or create a Property.
     * @example
     * // Update or create a Property
     * const property = await prisma.property.upsert({
     *   create: {
     *     // ... data to create a Property
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Property we want to update
     *   }
     * })
     */
    upsert<T extends PropertyUpsertArgs>(args: SelectSubset<T, PropertyUpsertArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Properties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCountArgs} args - Arguments to filter Properties to count.
     * @example
     * // Count the number of Properties
     * const count = await prisma.property.count({
     *   where: {
     *     // ... the filter for the Properties we want to count
     *   }
     * })
    **/
    count<T extends PropertyCountArgs>(
      args?: Subset<T, PropertyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropertyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyAggregateArgs>(args: Subset<T, PropertyAggregateArgs>): Prisma.PrismaPromise<GetPropertyAggregateType<T>>

    /**
     * Group by Property.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PropertyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PropertyGroupByArgs['orderBy'] }
        : { orderBy?: PropertyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PropertyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Property model
   */
  readonly fields: PropertyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Property.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PropertyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    landlord<T extends LandlordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LandlordDefaultArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    leases<T extends Property$leasesArgs<ExtArgs> = {}>(args?: Subset<T, Property$leasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applications<T extends Property$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Property$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    favoritedBy<T extends Property$favoritedByArgs<ExtArgs> = {}>(args?: Subset<T, Property$favoritedByArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tenants<T extends Property$tenantsArgs<ExtArgs> = {}>(args?: Subset<T, Property$tenantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Property model
   */
  interface PropertyFieldRefs {
    readonly id: FieldRef<"Property", 'Int'>
    readonly name: FieldRef<"Property", 'String'>
    readonly description: FieldRef<"Property", 'String'>
    readonly pricePerMonth: FieldRef<"Property", 'Float'>
    readonly securityDeposit: FieldRef<"Property", 'Float'>
    readonly applicationFee: FieldRef<"Property", 'Float'>
    readonly photoUrls: FieldRef<"Property", 'String[]'>
    readonly amenities: FieldRef<"Property", 'Amenity[]'>
    readonly highlights: FieldRef<"Property", 'Highlight[]'>
    readonly isPetsAllowed: FieldRef<"Property", 'Boolean'>
    readonly isParkingIncluded: FieldRef<"Property", 'Boolean'>
    readonly isBachelorFriendly: FieldRef<"Property", 'Boolean'>
    readonly isFemaleOnly: FieldRef<"Property", 'Boolean'>
    readonly genderPreference: FieldRef<"Property", 'GenderPreference'>
    readonly beds: FieldRef<"Property", 'Int'>
    readonly baths: FieldRef<"Property", 'Float'>
    readonly squareFeet: FieldRef<"Property", 'Int'>
    readonly propertyType: FieldRef<"Property", 'PropertyType'>
    readonly postedDate: FieldRef<"Property", 'DateTime'>
    readonly averageRating: FieldRef<"Property", 'Float'>
    readonly numberOfReviews: FieldRef<"Property", 'Int'>
    readonly locationId: FieldRef<"Property", 'Int'>
    readonly landlordCognitoId: FieldRef<"Property", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Property findUnique
   */
  export type PropertyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findUniqueOrThrow
   */
  export type PropertyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property findFirst
   */
  export type PropertyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findFirstOrThrow
   */
  export type PropertyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Property to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Properties.
     */
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property findMany
   */
  export type PropertyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter, which Properties to fetch.
     */
    where?: PropertyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Properties to fetch.
     */
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Properties.
     */
    cursor?: PropertyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Properties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Properties.
     */
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Property create
   */
  export type PropertyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to create a Property.
     */
    data: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
  }

  /**
   * Property createMany
   */
  export type PropertyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Property createManyAndReturn
   */
  export type PropertyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to create many Properties.
     */
    data: PropertyCreateManyInput | PropertyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property update
   */
  export type PropertyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The data needed to update a Property.
     */
    data: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
    /**
     * Choose, which Property to update.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property updateMany
   */
  export type PropertyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
  }

  /**
   * Property updateManyAndReturn
   */
  export type PropertyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * The data used to update Properties.
     */
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyInput>
    /**
     * Filter which Properties to update
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Property upsert
   */
  export type PropertyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * The filter to search for the Property to update in case it exists.
     */
    where: PropertyWhereUniqueInput
    /**
     * In case the Property found by the `where` argument doesn't exist, create a new Property with this data.
     */
    create: XOR<PropertyCreateInput, PropertyUncheckedCreateInput>
    /**
     * In case the Property was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PropertyUpdateInput, PropertyUncheckedUpdateInput>
  }

  /**
   * Property delete
   */
  export type PropertyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    /**
     * Filter which Property to delete.
     */
    where: PropertyWhereUniqueInput
  }

  /**
   * Property deleteMany
   */
  export type PropertyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Properties to delete
     */
    where?: PropertyWhereInput
    /**
     * Limit how many Properties to delete.
     */
    limit?: number
  }

  /**
   * Property.leases
   */
  export type Property$leasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    where?: LeaseWhereInput
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[]
    cursor?: LeaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[]
  }

  /**
   * Property.applications
   */
  export type Property$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    cursor?: ApplicationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Property.favoritedBy
   */
  export type Property$favoritedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    cursor?: TenantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Property.tenants
   */
  export type Property$tenantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tenant
     */
    select?: TenantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tenant
     */
    omit?: TenantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TenantInclude<ExtArgs> | null
    where?: TenantWhereInput
    orderBy?: TenantOrderByWithRelationInput | TenantOrderByWithRelationInput[]
    cursor?: TenantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TenantScalarFieldEnum | TenantScalarFieldEnum[]
  }

  /**
   * Property without action
   */
  export type PropertyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationAvgAggregateOutputType = {
    id: number | null
  }

  export type LocationSumAggregateOutputType = {
    id: number | null
  }

  export type LocationMinAggregateOutputType = {
    id: number | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
  }

  export type LocationMaxAggregateOutputType = {
    id: number | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postalCode: string | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    address: number
    city: number
    state: number
    country: number
    postalCode: number
    _all: number
  }


  export type LocationAvgAggregateInputType = {
    id?: true
  }

  export type LocationSumAggregateInputType = {
    id?: true
  }

  export type LocationMinAggregateInputType = {
    id?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    address?: true
    city?: true
    state?: true
    country?: true
    postalCode?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LocationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LocationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _avg?: LocationAvgAggregateInputType
    _sum?: LocationSumAggregateInputType
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: number
    address: string
    city: string
    state: string
    country: string
    postalCode: string
    _count: LocationCountAggregateOutputType | null
    _avg: LocationAvgAggregateOutputType | null
    _sum: LocationSumAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
    properties?: boolean | Location$propertiesArgs<ExtArgs>
    safetyIndicators?: boolean | Location$safetyIndicatorsArgs<ExtArgs>
    reviews?: boolean | Location$reviewsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>


  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    address?: boolean
    city?: boolean
    state?: boolean
    country?: boolean
    postalCode?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "address" | "city" | "state" | "country" | "postalCode", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    properties?: boolean | Location$propertiesArgs<ExtArgs>
    safetyIndicators?: boolean | Location$safetyIndicatorsArgs<ExtArgs>
    reviews?: boolean | Location$reviewsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      properties: Prisma.$PropertyPayload<ExtArgs>[]
      safetyIndicators: Prisma.$SafetyIndicatorPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      address: string
      city: string
      state: string
      country: string
      postalCode: string
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    properties<T extends Location$propertiesArgs<ExtArgs> = {}>(args?: Subset<T, Location$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    safetyIndicators<T extends Location$safetyIndicatorsArgs<ExtArgs> = {}>(args?: Subset<T, Location$safetyIndicatorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reviews<T extends Location$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Location$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'Int'>
    readonly address: FieldRef<"Location", 'String'>
    readonly city: FieldRef<"Location", 'String'>
    readonly state: FieldRef<"Location", 'String'>
    readonly country: FieldRef<"Location", 'String'>
    readonly postalCode: FieldRef<"Location", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.properties
   */
  export type Location$propertiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: PropertySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Property
     */
    omit?: PropertyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PropertyInclude<ExtArgs> | null
    where?: PropertyWhereInput
    orderBy?: PropertyOrderByWithRelationInput | PropertyOrderByWithRelationInput[]
    cursor?: PropertyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PropertyScalarFieldEnum | PropertyScalarFieldEnum[]
  }

  /**
   * Location.safetyIndicators
   */
  export type Location$safetyIndicatorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    where?: SafetyIndicatorWhereInput
    orderBy?: SafetyIndicatorOrderByWithRelationInput | SafetyIndicatorOrderByWithRelationInput[]
    cursor?: SafetyIndicatorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SafetyIndicatorScalarFieldEnum | SafetyIndicatorScalarFieldEnum[]
  }

  /**
   * Location.reviews
   */
  export type Location$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model Application
   */

  export type AggregateApplication = {
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  export type ApplicationAvgAggregateOutputType = {
    id: number | null
    propertyId: number | null
    leaseId: number | null
  }

  export type ApplicationSumAggregateOutputType = {
    id: number | null
    propertyId: number | null
    leaseId: number | null
  }

  export type ApplicationMinAggregateOutputType = {
    id: number | null
    applicationDate: Date | null
    status: $Enums.ApplicationStatus | null
    propertyId: number | null
    tenantCognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    message: string | null
    leaseId: number | null
  }

  export type ApplicationMaxAggregateOutputType = {
    id: number | null
    applicationDate: Date | null
    status: $Enums.ApplicationStatus | null
    propertyId: number | null
    tenantCognitoId: string | null
    name: string | null
    email: string | null
    phoneNumber: string | null
    message: string | null
    leaseId: number | null
  }

  export type ApplicationCountAggregateOutputType = {
    id: number
    applicationDate: number
    status: number
    propertyId: number
    tenantCognitoId: number
    name: number
    email: number
    phoneNumber: number
    message: number
    leaseId: number
    _all: number
  }


  export type ApplicationAvgAggregateInputType = {
    id?: true
    propertyId?: true
    leaseId?: true
  }

  export type ApplicationSumAggregateInputType = {
    id?: true
    propertyId?: true
    leaseId?: true
  }

  export type ApplicationMinAggregateInputType = {
    id?: true
    applicationDate?: true
    status?: true
    propertyId?: true
    tenantCognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    message?: true
    leaseId?: true
  }

  export type ApplicationMaxAggregateInputType = {
    id?: true
    applicationDate?: true
    status?: true
    propertyId?: true
    tenantCognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    message?: true
    leaseId?: true
  }

  export type ApplicationCountAggregateInputType = {
    id?: true
    applicationDate?: true
    status?: true
    propertyId?: true
    tenantCognitoId?: true
    name?: true
    email?: true
    phoneNumber?: true
    message?: true
    leaseId?: true
    _all?: true
  }

  export type ApplicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Application to aggregate.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ApplicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ApplicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationMaxAggregateInputType
  }

  export type GetApplicationAggregateType<T extends ApplicationAggregateArgs> = {
        [P in keyof T & keyof AggregateApplication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplication[P]>
      : GetScalarType<T[P], AggregateApplication[P]>
  }




  export type ApplicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationWhereInput
    orderBy?: ApplicationOrderByWithAggregationInput | ApplicationOrderByWithAggregationInput[]
    by: ApplicationScalarFieldEnum[] | ApplicationScalarFieldEnum
    having?: ApplicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationCountAggregateInputType | true
    _avg?: ApplicationAvgAggregateInputType
    _sum?: ApplicationSumAggregateInputType
    _min?: ApplicationMinAggregateInputType
    _max?: ApplicationMaxAggregateInputType
  }

  export type ApplicationGroupByOutputType = {
    id: number
    applicationDate: Date
    status: $Enums.ApplicationStatus
    propertyId: number
    tenantCognitoId: string
    name: string
    email: string
    phoneNumber: string
    message: string | null
    leaseId: number | null
    _count: ApplicationCountAggregateOutputType | null
    _avg: ApplicationAvgAggregateOutputType | null
    _sum: ApplicationSumAggregateOutputType | null
    _min: ApplicationMinAggregateOutputType | null
    _max: ApplicationMaxAggregateOutputType | null
  }

  type GetApplicationGroupByPayload<T extends ApplicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationDate?: boolean
    status?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    message?: boolean
    leaseId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    lease?: boolean | Application$leaseArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationDate?: boolean
    status?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    message?: boolean
    leaseId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    lease?: boolean | Application$leaseArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    applicationDate?: boolean
    status?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    message?: boolean
    leaseId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    lease?: boolean | Application$leaseArgs<ExtArgs>
  }, ExtArgs["result"]["application"]>

  export type ApplicationSelectScalar = {
    id?: boolean
    applicationDate?: boolean
    status?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    name?: boolean
    email?: boolean
    phoneNumber?: boolean
    message?: boolean
    leaseId?: boolean
  }

  export type ApplicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "applicationDate" | "status" | "propertyId" | "tenantCognitoId" | "name" | "email" | "phoneNumber" | "message" | "leaseId", ExtArgs["result"]["application"]>
  export type ApplicationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    lease?: boolean | Application$leaseArgs<ExtArgs>
  }
  export type ApplicationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    lease?: boolean | Application$leaseArgs<ExtArgs>
  }
  export type ApplicationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    lease?: boolean | Application$leaseArgs<ExtArgs>
  }

  export type $ApplicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Application"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
      lease: Prisma.$LeasePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      applicationDate: Date
      status: $Enums.ApplicationStatus
      propertyId: number
      tenantCognitoId: string
      name: string
      email: string
      phoneNumber: string
      message: string | null
      leaseId: number | null
    }, ExtArgs["result"]["application"]>
    composites: {}
  }

  type ApplicationGetPayload<S extends boolean | null | undefined | ApplicationDefaultArgs> = $Result.GetResult<Prisma.$ApplicationPayload, S>

  type ApplicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationCountAggregateInputType | true
    }

  export interface ApplicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Application'], meta: { name: 'Application' } }
    /**
     * Find zero or one Application that matches the filter.
     * @param {ApplicationFindUniqueArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationFindUniqueArgs>(args: SelectSubset<T, ApplicationFindUniqueArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Application that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationFindUniqueOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationFindFirstArgs>(args?: SelectSubset<T, ApplicationFindFirstArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Application that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindFirstOrThrowArgs} args - Arguments to find a Application
     * @example
     * // Get one Application
     * const application = await prisma.application.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.application.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.application.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationWithIdOnly = await prisma.application.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationFindManyArgs>(args?: SelectSubset<T, ApplicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Application.
     * @param {ApplicationCreateArgs} args - Arguments to create a Application.
     * @example
     * // Create one Application
     * const Application = await prisma.application.create({
     *   data: {
     *     // ... data to create a Application
     *   }
     * })
     * 
     */
    create<T extends ApplicationCreateArgs>(args: SelectSubset<T, ApplicationCreateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Applications.
     * @param {ApplicationCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationCreateManyArgs>(args?: SelectSubset<T, ApplicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Applications and returns the data saved in the database.
     * @param {ApplicationCreateManyAndReturnArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const application = await prisma.application.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApplicationCreateManyAndReturnArgs>(args?: SelectSubset<T, ApplicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Application.
     * @param {ApplicationDeleteArgs} args - Arguments to delete one Application.
     * @example
     * // Delete one Application
     * const Application = await prisma.application.delete({
     *   where: {
     *     // ... filter to delete one Application
     *   }
     * })
     * 
     */
    delete<T extends ApplicationDeleteArgs>(args: SelectSubset<T, ApplicationDeleteArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Application.
     * @param {ApplicationUpdateArgs} args - Arguments to update one Application.
     * @example
     * // Update one Application
     * const application = await prisma.application.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationUpdateArgs>(args: SelectSubset<T, ApplicationUpdateArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.application.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationDeleteManyArgs>(args?: SelectSubset<T, ApplicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationUpdateManyArgs>(args: SelectSubset<T, ApplicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications and returns the data updated in the database.
     * @param {ApplicationUpdateManyAndReturnArgs} args - Arguments to update many Applications.
     * @example
     * // Update many Applications
     * const application = await prisma.application.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Applications and only return the `id`
     * const applicationWithIdOnly = await prisma.application.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ApplicationUpdateManyAndReturnArgs>(args: SelectSubset<T, ApplicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Application.
     * @param {ApplicationUpsertArgs} args - Arguments to update or create a Application.
     * @example
     * // Update or create a Application
     * const application = await prisma.application.upsert({
     *   create: {
     *     // ... data to create a Application
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Application we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationUpsertArgs>(args: SelectSubset<T, ApplicationUpsertArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.application.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationCountArgs>(
      args?: Subset<T, ApplicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationAggregateArgs>(args: Subset<T, ApplicationAggregateArgs>): Prisma.PrismaPromise<GetApplicationAggregateType<T>>

    /**
     * Group by Application.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Application model
   */
  readonly fields: ApplicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Application.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lease<T extends Application$leaseArgs<ExtArgs> = {}>(args?: Subset<T, Application$leaseArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Application model
   */
  interface ApplicationFieldRefs {
    readonly id: FieldRef<"Application", 'Int'>
    readonly applicationDate: FieldRef<"Application", 'DateTime'>
    readonly status: FieldRef<"Application", 'ApplicationStatus'>
    readonly propertyId: FieldRef<"Application", 'Int'>
    readonly tenantCognitoId: FieldRef<"Application", 'String'>
    readonly name: FieldRef<"Application", 'String'>
    readonly email: FieldRef<"Application", 'String'>
    readonly phoneNumber: FieldRef<"Application", 'String'>
    readonly message: FieldRef<"Application", 'String'>
    readonly leaseId: FieldRef<"Application", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Application findUnique
   */
  export type ApplicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findUniqueOrThrow
   */
  export type ApplicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application findFirst
   */
  export type ApplicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findFirstOrThrow
   */
  export type ApplicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Application to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application findMany
   */
  export type ApplicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationOrderByWithRelationInput | ApplicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    distinct?: ApplicationScalarFieldEnum | ApplicationScalarFieldEnum[]
  }

  /**
   * Application create
   */
  export type ApplicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to create a Application.
     */
    data: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
  }

  /**
   * Application createMany
   */
  export type ApplicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Application createManyAndReturn
   */
  export type ApplicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to create many Applications.
     */
    data: ApplicationCreateManyInput | ApplicationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application update
   */
  export type ApplicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The data needed to update a Application.
     */
    data: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
    /**
     * Choose, which Application to update.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application updateMany
   */
  export type ApplicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Application updateManyAndReturn
   */
  export type ApplicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Application upsert
   */
  export type ApplicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * The filter to search for the Application to update in case it exists.
     */
    where: ApplicationWhereUniqueInput
    /**
     * In case the Application found by the `where` argument doesn't exist, create a new Application with this data.
     */
    create: XOR<ApplicationCreateInput, ApplicationUncheckedCreateInput>
    /**
     * In case the Application was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationUpdateInput, ApplicationUncheckedUpdateInput>
  }

  /**
   * Application delete
   */
  export type ApplicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    /**
     * Filter which Application to delete.
     */
    where: ApplicationWhereUniqueInput
  }

  /**
   * Application deleteMany
   */
  export type ApplicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Application.lease
   */
  export type Application$leaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    where?: LeaseWhereInput
  }

  /**
   * Application without action
   */
  export type ApplicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
  }


  /**
   * Model Lease
   */

  export type AggregateLease = {
    _count: LeaseCountAggregateOutputType | null
    _avg: LeaseAvgAggregateOutputType | null
    _sum: LeaseSumAggregateOutputType | null
    _min: LeaseMinAggregateOutputType | null
    _max: LeaseMaxAggregateOutputType | null
  }

  export type LeaseAvgAggregateOutputType = {
    id: number | null
    rent: number | null
    deposit: number | null
    propertyId: number | null
  }

  export type LeaseSumAggregateOutputType = {
    id: number | null
    rent: number | null
    deposit: number | null
    propertyId: number | null
  }

  export type LeaseMinAggregateOutputType = {
    id: number | null
    startDate: Date | null
    endDate: Date | null
    rent: number | null
    deposit: number | null
    propertyId: number | null
    tenantCognitoId: string | null
  }

  export type LeaseMaxAggregateOutputType = {
    id: number | null
    startDate: Date | null
    endDate: Date | null
    rent: number | null
    deposit: number | null
    propertyId: number | null
    tenantCognitoId: string | null
  }

  export type LeaseCountAggregateOutputType = {
    id: number
    startDate: number
    endDate: number
    rent: number
    deposit: number
    propertyId: number
    tenantCognitoId: number
    _all: number
  }


  export type LeaseAvgAggregateInputType = {
    id?: true
    rent?: true
    deposit?: true
    propertyId?: true
  }

  export type LeaseSumAggregateInputType = {
    id?: true
    rent?: true
    deposit?: true
    propertyId?: true
  }

  export type LeaseMinAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    rent?: true
    deposit?: true
    propertyId?: true
    tenantCognitoId?: true
  }

  export type LeaseMaxAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    rent?: true
    deposit?: true
    propertyId?: true
    tenantCognitoId?: true
  }

  export type LeaseCountAggregateInputType = {
    id?: true
    startDate?: true
    endDate?: true
    rent?: true
    deposit?: true
    propertyId?: true
    tenantCognitoId?: true
    _all?: true
  }

  export type LeaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lease to aggregate.
     */
    where?: LeaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LeaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Leases
    **/
    _count?: true | LeaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LeaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LeaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LeaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LeaseMaxAggregateInputType
  }

  export type GetLeaseAggregateType<T extends LeaseAggregateArgs> = {
        [P in keyof T & keyof AggregateLease]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLease[P]>
      : GetScalarType<T[P], AggregateLease[P]>
  }




  export type LeaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LeaseWhereInput
    orderBy?: LeaseOrderByWithAggregationInput | LeaseOrderByWithAggregationInput[]
    by: LeaseScalarFieldEnum[] | LeaseScalarFieldEnum
    having?: LeaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LeaseCountAggregateInputType | true
    _avg?: LeaseAvgAggregateInputType
    _sum?: LeaseSumAggregateInputType
    _min?: LeaseMinAggregateInputType
    _max?: LeaseMaxAggregateInputType
  }

  export type LeaseGroupByOutputType = {
    id: number
    startDate: Date
    endDate: Date
    rent: number
    deposit: number
    propertyId: number
    tenantCognitoId: string
    _count: LeaseCountAggregateOutputType | null
    _avg: LeaseAvgAggregateOutputType | null
    _sum: LeaseSumAggregateOutputType | null
    _min: LeaseMinAggregateOutputType | null
    _max: LeaseMaxAggregateOutputType | null
  }

  type GetLeaseGroupByPayload<T extends LeaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LeaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LeaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LeaseGroupByOutputType[P]>
            : GetScalarType<T[P], LeaseGroupByOutputType[P]>
        }
      >
    >


  export type LeaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    rent?: boolean
    deposit?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    application?: boolean | Lease$applicationArgs<ExtArgs>
    payments?: boolean | Lease$paymentsArgs<ExtArgs>
    _count?: boolean | LeaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lease"]>

  export type LeaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    rent?: boolean
    deposit?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lease"]>

  export type LeaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    rent?: boolean
    deposit?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lease"]>

  export type LeaseSelectScalar = {
    id?: boolean
    startDate?: boolean
    endDate?: boolean
    rent?: boolean
    deposit?: boolean
    propertyId?: boolean
    tenantCognitoId?: boolean
  }

  export type LeaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "startDate" | "endDate" | "rent" | "deposit" | "propertyId" | "tenantCognitoId", ExtArgs["result"]["lease"]>
  export type LeaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    application?: boolean | Lease$applicationArgs<ExtArgs>
    payments?: boolean | Lease$paymentsArgs<ExtArgs>
    _count?: boolean | LeaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LeaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }
  export type LeaseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    property?: boolean | PropertyDefaultArgs<ExtArgs>
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
  }

  export type $LeasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lease"
    objects: {
      property: Prisma.$PropertyPayload<ExtArgs>
      tenant: Prisma.$TenantPayload<ExtArgs>
      application: Prisma.$ApplicationPayload<ExtArgs> | null
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      startDate: Date
      endDate: Date
      rent: number
      deposit: number
      propertyId: number
      tenantCognitoId: string
    }, ExtArgs["result"]["lease"]>
    composites: {}
  }

  type LeaseGetPayload<S extends boolean | null | undefined | LeaseDefaultArgs> = $Result.GetResult<Prisma.$LeasePayload, S>

  type LeaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LeaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LeaseCountAggregateInputType | true
    }

  export interface LeaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lease'], meta: { name: 'Lease' } }
    /**
     * Find zero or one Lease that matches the filter.
     * @param {LeaseFindUniqueArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LeaseFindUniqueArgs>(args: SelectSubset<T, LeaseFindUniqueArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lease that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LeaseFindUniqueOrThrowArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LeaseFindUniqueOrThrowArgs>(args: SelectSubset<T, LeaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lease that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseFindFirstArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LeaseFindFirstArgs>(args?: SelectSubset<T, LeaseFindFirstArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lease that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseFindFirstOrThrowArgs} args - Arguments to find a Lease
     * @example
     * // Get one Lease
     * const lease = await prisma.lease.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LeaseFindFirstOrThrowArgs>(args?: SelectSubset<T, LeaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Leases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Leases
     * const leases = await prisma.lease.findMany()
     * 
     * // Get first 10 Leases
     * const leases = await prisma.lease.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const leaseWithIdOnly = await prisma.lease.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LeaseFindManyArgs>(args?: SelectSubset<T, LeaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lease.
     * @param {LeaseCreateArgs} args - Arguments to create a Lease.
     * @example
     * // Create one Lease
     * const Lease = await prisma.lease.create({
     *   data: {
     *     // ... data to create a Lease
     *   }
     * })
     * 
     */
    create<T extends LeaseCreateArgs>(args: SelectSubset<T, LeaseCreateArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Leases.
     * @param {LeaseCreateManyArgs} args - Arguments to create many Leases.
     * @example
     * // Create many Leases
     * const lease = await prisma.lease.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LeaseCreateManyArgs>(args?: SelectSubset<T, LeaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Leases and returns the data saved in the database.
     * @param {LeaseCreateManyAndReturnArgs} args - Arguments to create many Leases.
     * @example
     * // Create many Leases
     * const lease = await prisma.lease.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Leases and only return the `id`
     * const leaseWithIdOnly = await prisma.lease.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LeaseCreateManyAndReturnArgs>(args?: SelectSubset<T, LeaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lease.
     * @param {LeaseDeleteArgs} args - Arguments to delete one Lease.
     * @example
     * // Delete one Lease
     * const Lease = await prisma.lease.delete({
     *   where: {
     *     // ... filter to delete one Lease
     *   }
     * })
     * 
     */
    delete<T extends LeaseDeleteArgs>(args: SelectSubset<T, LeaseDeleteArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lease.
     * @param {LeaseUpdateArgs} args - Arguments to update one Lease.
     * @example
     * // Update one Lease
     * const lease = await prisma.lease.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LeaseUpdateArgs>(args: SelectSubset<T, LeaseUpdateArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Leases.
     * @param {LeaseDeleteManyArgs} args - Arguments to filter Leases to delete.
     * @example
     * // Delete a few Leases
     * const { count } = await prisma.lease.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LeaseDeleteManyArgs>(args?: SelectSubset<T, LeaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Leases
     * const lease = await prisma.lease.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LeaseUpdateManyArgs>(args: SelectSubset<T, LeaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Leases and returns the data updated in the database.
     * @param {LeaseUpdateManyAndReturnArgs} args - Arguments to update many Leases.
     * @example
     * // Update many Leases
     * const lease = await prisma.lease.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Leases and only return the `id`
     * const leaseWithIdOnly = await prisma.lease.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LeaseUpdateManyAndReturnArgs>(args: SelectSubset<T, LeaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lease.
     * @param {LeaseUpsertArgs} args - Arguments to update or create a Lease.
     * @example
     * // Update or create a Lease
     * const lease = await prisma.lease.upsert({
     *   create: {
     *     // ... data to create a Lease
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lease we want to update
     *   }
     * })
     */
    upsert<T extends LeaseUpsertArgs>(args: SelectSubset<T, LeaseUpsertArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Leases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseCountArgs} args - Arguments to filter Leases to count.
     * @example
     * // Count the number of Leases
     * const count = await prisma.lease.count({
     *   where: {
     *     // ... the filter for the Leases we want to count
     *   }
     * })
    **/
    count<T extends LeaseCountArgs>(
      args?: Subset<T, LeaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LeaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LeaseAggregateArgs>(args: Subset<T, LeaseAggregateArgs>): Prisma.PrismaPromise<GetLeaseAggregateType<T>>

    /**
     * Group by Lease.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LeaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LeaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LeaseGroupByArgs['orderBy'] }
        : { orderBy?: LeaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LeaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLeaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lease model
   */
  readonly fields: LeaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lease.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LeaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    property<T extends PropertyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PropertyDefaultArgs<ExtArgs>>): Prisma__PropertyClient<$Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    application<T extends Lease$applicationArgs<ExtArgs> = {}>(args?: Subset<T, Lease$applicationArgs<ExtArgs>>): Prisma__ApplicationClient<$Result.GetResult<Prisma.$ApplicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payments<T extends Lease$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Lease$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lease model
   */
  interface LeaseFieldRefs {
    readonly id: FieldRef<"Lease", 'Int'>
    readonly startDate: FieldRef<"Lease", 'DateTime'>
    readonly endDate: FieldRef<"Lease", 'DateTime'>
    readonly rent: FieldRef<"Lease", 'Float'>
    readonly deposit: FieldRef<"Lease", 'Float'>
    readonly propertyId: FieldRef<"Lease", 'Int'>
    readonly tenantCognitoId: FieldRef<"Lease", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Lease findUnique
   */
  export type LeaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * Filter, which Lease to fetch.
     */
    where: LeaseWhereUniqueInput
  }

  /**
   * Lease findUniqueOrThrow
   */
  export type LeaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * Filter, which Lease to fetch.
     */
    where: LeaseWhereUniqueInput
  }

  /**
   * Lease findFirst
   */
  export type LeaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * Filter, which Lease to fetch.
     */
    where?: LeaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leases.
     */
    cursor?: LeaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leases.
     */
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[]
  }

  /**
   * Lease findFirstOrThrow
   */
  export type LeaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * Filter, which Lease to fetch.
     */
    where?: LeaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Leases.
     */
    cursor?: LeaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Leases.
     */
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[]
  }

  /**
   * Lease findMany
   */
  export type LeaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * Filter, which Leases to fetch.
     */
    where?: LeaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Leases to fetch.
     */
    orderBy?: LeaseOrderByWithRelationInput | LeaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Leases.
     */
    cursor?: LeaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Leases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Leases.
     */
    skip?: number
    distinct?: LeaseScalarFieldEnum | LeaseScalarFieldEnum[]
  }

  /**
   * Lease create
   */
  export type LeaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Lease.
     */
    data: XOR<LeaseCreateInput, LeaseUncheckedCreateInput>
  }

  /**
   * Lease createMany
   */
  export type LeaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Leases.
     */
    data: LeaseCreateManyInput | LeaseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Lease createManyAndReturn
   */
  export type LeaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * The data used to create many Leases.
     */
    data: LeaseCreateManyInput | LeaseCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lease update
   */
  export type LeaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Lease.
     */
    data: XOR<LeaseUpdateInput, LeaseUncheckedUpdateInput>
    /**
     * Choose, which Lease to update.
     */
    where: LeaseWhereUniqueInput
  }

  /**
   * Lease updateMany
   */
  export type LeaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Leases.
     */
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyInput>
    /**
     * Filter which Leases to update
     */
    where?: LeaseWhereInput
    /**
     * Limit how many Leases to update.
     */
    limit?: number
  }

  /**
   * Lease updateManyAndReturn
   */
  export type LeaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * The data used to update Leases.
     */
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyInput>
    /**
     * Filter which Leases to update
     */
    where?: LeaseWhereInput
    /**
     * Limit how many Leases to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Lease upsert
   */
  export type LeaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Lease to update in case it exists.
     */
    where: LeaseWhereUniqueInput
    /**
     * In case the Lease found by the `where` argument doesn't exist, create a new Lease with this data.
     */
    create: XOR<LeaseCreateInput, LeaseUncheckedCreateInput>
    /**
     * In case the Lease was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LeaseUpdateInput, LeaseUncheckedUpdateInput>
  }

  /**
   * Lease delete
   */
  export type LeaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
    /**
     * Filter which Lease to delete.
     */
    where: LeaseWhereUniqueInput
  }

  /**
   * Lease deleteMany
   */
  export type LeaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Leases to delete
     */
    where?: LeaseWhereInput
    /**
     * Limit how many Leases to delete.
     */
    limit?: number
  }

  /**
   * Lease.application
   */
  export type Lease$applicationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Application
     */
    select?: ApplicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Application
     */
    omit?: ApplicationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationInclude<ExtArgs> | null
    where?: ApplicationWhereInput
  }

  /**
   * Lease.payments
   */
  export type Lease$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Lease without action
   */
  export type LeaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lease
     */
    select?: LeaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lease
     */
    omit?: LeaseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LeaseInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    amountDue: number | null
    amountPaid: number | null
    leaseId: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    amountDue: number | null
    amountPaid: number | null
    leaseId: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    amountDue: number | null
    amountPaid: number | null
    dueDate: Date | null
    paymentDate: Date | null
    paymentStatus: $Enums.PaymentStatus | null
    leaseId: number | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    amountDue: number | null
    amountPaid: number | null
    dueDate: Date | null
    paymentDate: Date | null
    paymentStatus: $Enums.PaymentStatus | null
    leaseId: number | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    amountDue: number
    amountPaid: number
    dueDate: number
    paymentDate: number
    paymentStatus: number
    leaseId: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    amountDue?: true
    amountPaid?: true
    leaseId?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    amountDue?: true
    amountPaid?: true
    leaseId?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    amountDue?: true
    amountPaid?: true
    dueDate?: true
    paymentDate?: true
    paymentStatus?: true
    leaseId?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    amountDue?: true
    amountPaid?: true
    dueDate?: true
    paymentDate?: true
    paymentStatus?: true
    leaseId?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    amountDue?: true
    amountPaid?: true
    dueDate?: true
    paymentDate?: true
    paymentStatus?: true
    leaseId?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    amountDue: number
    amountPaid: number
    dueDate: Date
    paymentDate: Date
    paymentStatus: $Enums.PaymentStatus
    leaseId: number
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    paymentDate?: boolean
    paymentStatus?: boolean
    leaseId?: boolean
    lease?: boolean | LeaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    paymentDate?: boolean
    paymentStatus?: boolean
    leaseId?: boolean
    lease?: boolean | LeaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    paymentDate?: boolean
    paymentStatus?: boolean
    leaseId?: boolean
    lease?: boolean | LeaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    amountDue?: boolean
    amountPaid?: boolean
    dueDate?: boolean
    paymentDate?: boolean
    paymentStatus?: boolean
    leaseId?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amountDue" | "amountPaid" | "dueDate" | "paymentDate" | "paymentStatus" | "leaseId", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lease?: boolean | LeaseDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lease?: boolean | LeaseDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lease?: boolean | LeaseDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      lease: Prisma.$LeasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amountDue: number
      amountPaid: number
      dueDate: Date
      paymentDate: Date
      paymentStatus: $Enums.PaymentStatus
      leaseId: number
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lease<T extends LeaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LeaseDefaultArgs<ExtArgs>>): Prisma__LeaseClient<$Result.GetResult<Prisma.$LeasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly amountDue: FieldRef<"Payment", 'Float'>
    readonly amountPaid: FieldRef<"Payment", 'Float'>
    readonly dueDate: FieldRef<"Payment", 'DateTime'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly paymentStatus: FieldRef<"Payment", 'PaymentStatus'>
    readonly leaseId: FieldRef<"Payment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    id: number | null
    rating: number | null
    tenantId: number | null
    landlordId: number | null
    locationId: number | null
  }

  export type ReviewSumAggregateOutputType = {
    id: number | null
    rating: number | null
    tenantId: number | null
    landlordId: number | null
    locationId: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    tenantId: number | null
    landlordId: number | null
    locationId: number | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: number | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    tenantId: number | null
    landlordId: number | null
    locationId: number | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    rating: number
    comment: number
    createdAt: number
    tenantId: number
    landlordId: number
    locationId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    id?: true
    rating?: true
    tenantId?: true
    landlordId?: true
    locationId?: true
  }

  export type ReviewSumAggregateInputType = {
    id?: true
    rating?: true
    tenantId?: true
    landlordId?: true
    locationId?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    tenantId?: true
    landlordId?: true
    locationId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    tenantId?: true
    landlordId?: true
    locationId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    rating?: true
    comment?: true
    createdAt?: true
    tenantId?: true
    landlordId?: true
    locationId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: number
    rating: number
    comment: string | null
    createdAt: Date
    tenantId: number
    landlordId: number
    locationId: number
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    tenantId?: boolean
    landlordId?: boolean
    locationId?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    tenantId?: boolean
    landlordId?: boolean
    locationId?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    tenantId?: boolean
    landlordId?: boolean
    locationId?: boolean
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    tenantId?: boolean
    landlordId?: boolean
    locationId?: boolean
  }

  export type ReviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rating" | "comment" | "createdAt" | "tenantId" | "landlordId" | "locationId", ExtArgs["result"]["review"]>
  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type ReviewIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tenant?: boolean | TenantDefaultArgs<ExtArgs>
    landlord?: boolean | LandlordDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      tenant: Prisma.$TenantPayload<ExtArgs>
      landlord: Prisma.$LandlordPayload<ExtArgs>
      location: Prisma.$LocationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      rating: number
      comment: string | null
      createdAt: Date
      tenantId: number
      landlordId: number
      locationId: number
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs>(args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews and returns the data updated in the database.
     * @param {ReviewUpdateManyAndReturnArgs} args - Arguments to update many Reviews.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReviewUpdateManyAndReturnArgs>(args: SelectSubset<T, ReviewUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tenant<T extends TenantDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TenantDefaultArgs<ExtArgs>>): Prisma__TenantClient<$Result.GetResult<Prisma.$TenantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    landlord<T extends LandlordDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LandlordDefaultArgs<ExtArgs>>): Prisma__LandlordClient<$Result.GetResult<Prisma.$LandlordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'Int'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly tenantId: FieldRef<"Review", 'Int'>
    readonly landlordId: FieldRef<"Review", 'Int'>
    readonly locationId: FieldRef<"Review", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
  }

  /**
   * Review updateManyAndReturn
   */
  export type ReviewUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
    /**
     * Limit how many Reviews to delete.
     */
    limit?: number
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Review
     */
    omit?: ReviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model SafetyIndicator
   */

  export type AggregateSafetyIndicator = {
    _count: SafetyIndicatorCountAggregateOutputType | null
    _avg: SafetyIndicatorAvgAggregateOutputType | null
    _sum: SafetyIndicatorSumAggregateOutputType | null
    _min: SafetyIndicatorMinAggregateOutputType | null
    _max: SafetyIndicatorMaxAggregateOutputType | null
  }

  export type SafetyIndicatorAvgAggregateOutputType = {
    id: number | null
    locationId: number | null
  }

  export type SafetyIndicatorSumAggregateOutputType = {
    id: number | null
    locationId: number | null
  }

  export type SafetyIndicatorMinAggregateOutputType = {
    id: number | null
    level: $Enums.SafetyLevel | null
    reason: string | null
    updatedAt: Date | null
    locationId: number | null
  }

  export type SafetyIndicatorMaxAggregateOutputType = {
    id: number | null
    level: $Enums.SafetyLevel | null
    reason: string | null
    updatedAt: Date | null
    locationId: number | null
  }

  export type SafetyIndicatorCountAggregateOutputType = {
    id: number
    level: number
    reason: number
    updatedAt: number
    locationId: number
    _all: number
  }


  export type SafetyIndicatorAvgAggregateInputType = {
    id?: true
    locationId?: true
  }

  export type SafetyIndicatorSumAggregateInputType = {
    id?: true
    locationId?: true
  }

  export type SafetyIndicatorMinAggregateInputType = {
    id?: true
    level?: true
    reason?: true
    updatedAt?: true
    locationId?: true
  }

  export type SafetyIndicatorMaxAggregateInputType = {
    id?: true
    level?: true
    reason?: true
    updatedAt?: true
    locationId?: true
  }

  export type SafetyIndicatorCountAggregateInputType = {
    id?: true
    level?: true
    reason?: true
    updatedAt?: true
    locationId?: true
    _all?: true
  }

  export type SafetyIndicatorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SafetyIndicator to aggregate.
     */
    where?: SafetyIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafetyIndicators to fetch.
     */
    orderBy?: SafetyIndicatorOrderByWithRelationInput | SafetyIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SafetyIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafetyIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafetyIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SafetyIndicators
    **/
    _count?: true | SafetyIndicatorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SafetyIndicatorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SafetyIndicatorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SafetyIndicatorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SafetyIndicatorMaxAggregateInputType
  }

  export type GetSafetyIndicatorAggregateType<T extends SafetyIndicatorAggregateArgs> = {
        [P in keyof T & keyof AggregateSafetyIndicator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSafetyIndicator[P]>
      : GetScalarType<T[P], AggregateSafetyIndicator[P]>
  }




  export type SafetyIndicatorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SafetyIndicatorWhereInput
    orderBy?: SafetyIndicatorOrderByWithAggregationInput | SafetyIndicatorOrderByWithAggregationInput[]
    by: SafetyIndicatorScalarFieldEnum[] | SafetyIndicatorScalarFieldEnum
    having?: SafetyIndicatorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SafetyIndicatorCountAggregateInputType | true
    _avg?: SafetyIndicatorAvgAggregateInputType
    _sum?: SafetyIndicatorSumAggregateInputType
    _min?: SafetyIndicatorMinAggregateInputType
    _max?: SafetyIndicatorMaxAggregateInputType
  }

  export type SafetyIndicatorGroupByOutputType = {
    id: number
    level: $Enums.SafetyLevel
    reason: string
    updatedAt: Date
    locationId: number
    _count: SafetyIndicatorCountAggregateOutputType | null
    _avg: SafetyIndicatorAvgAggregateOutputType | null
    _sum: SafetyIndicatorSumAggregateOutputType | null
    _min: SafetyIndicatorMinAggregateOutputType | null
    _max: SafetyIndicatorMaxAggregateOutputType | null
  }

  type GetSafetyIndicatorGroupByPayload<T extends SafetyIndicatorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SafetyIndicatorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SafetyIndicatorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SafetyIndicatorGroupByOutputType[P]>
            : GetScalarType<T[P], SafetyIndicatorGroupByOutputType[P]>
        }
      >
    >


  export type SafetyIndicatorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    reason?: boolean
    updatedAt?: boolean
    locationId?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["safetyIndicator"]>

  export type SafetyIndicatorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    reason?: boolean
    updatedAt?: boolean
    locationId?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["safetyIndicator"]>

  export type SafetyIndicatorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    level?: boolean
    reason?: boolean
    updatedAt?: boolean
    locationId?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["safetyIndicator"]>

  export type SafetyIndicatorSelectScalar = {
    id?: boolean
    level?: boolean
    reason?: boolean
    updatedAt?: boolean
    locationId?: boolean
  }

  export type SafetyIndicatorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "level" | "reason" | "updatedAt" | "locationId", ExtArgs["result"]["safetyIndicator"]>
  export type SafetyIndicatorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type SafetyIndicatorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }
  export type SafetyIndicatorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
  }

  export type $SafetyIndicatorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SafetyIndicator"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      level: $Enums.SafetyLevel
      reason: string
      updatedAt: Date
      locationId: number
    }, ExtArgs["result"]["safetyIndicator"]>
    composites: {}
  }

  type SafetyIndicatorGetPayload<S extends boolean | null | undefined | SafetyIndicatorDefaultArgs> = $Result.GetResult<Prisma.$SafetyIndicatorPayload, S>

  type SafetyIndicatorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SafetyIndicatorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SafetyIndicatorCountAggregateInputType | true
    }

  export interface SafetyIndicatorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SafetyIndicator'], meta: { name: 'SafetyIndicator' } }
    /**
     * Find zero or one SafetyIndicator that matches the filter.
     * @param {SafetyIndicatorFindUniqueArgs} args - Arguments to find a SafetyIndicator
     * @example
     * // Get one SafetyIndicator
     * const safetyIndicator = await prisma.safetyIndicator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SafetyIndicatorFindUniqueArgs>(args: SelectSubset<T, SafetyIndicatorFindUniqueArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SafetyIndicator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SafetyIndicatorFindUniqueOrThrowArgs} args - Arguments to find a SafetyIndicator
     * @example
     * // Get one SafetyIndicator
     * const safetyIndicator = await prisma.safetyIndicator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SafetyIndicatorFindUniqueOrThrowArgs>(args: SelectSubset<T, SafetyIndicatorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SafetyIndicator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorFindFirstArgs} args - Arguments to find a SafetyIndicator
     * @example
     * // Get one SafetyIndicator
     * const safetyIndicator = await prisma.safetyIndicator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SafetyIndicatorFindFirstArgs>(args?: SelectSubset<T, SafetyIndicatorFindFirstArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SafetyIndicator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorFindFirstOrThrowArgs} args - Arguments to find a SafetyIndicator
     * @example
     * // Get one SafetyIndicator
     * const safetyIndicator = await prisma.safetyIndicator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SafetyIndicatorFindFirstOrThrowArgs>(args?: SelectSubset<T, SafetyIndicatorFindFirstOrThrowArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SafetyIndicators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SafetyIndicators
     * const safetyIndicators = await prisma.safetyIndicator.findMany()
     * 
     * // Get first 10 SafetyIndicators
     * const safetyIndicators = await prisma.safetyIndicator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const safetyIndicatorWithIdOnly = await prisma.safetyIndicator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SafetyIndicatorFindManyArgs>(args?: SelectSubset<T, SafetyIndicatorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SafetyIndicator.
     * @param {SafetyIndicatorCreateArgs} args - Arguments to create a SafetyIndicator.
     * @example
     * // Create one SafetyIndicator
     * const SafetyIndicator = await prisma.safetyIndicator.create({
     *   data: {
     *     // ... data to create a SafetyIndicator
     *   }
     * })
     * 
     */
    create<T extends SafetyIndicatorCreateArgs>(args: SelectSubset<T, SafetyIndicatorCreateArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SafetyIndicators.
     * @param {SafetyIndicatorCreateManyArgs} args - Arguments to create many SafetyIndicators.
     * @example
     * // Create many SafetyIndicators
     * const safetyIndicator = await prisma.safetyIndicator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SafetyIndicatorCreateManyArgs>(args?: SelectSubset<T, SafetyIndicatorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SafetyIndicators and returns the data saved in the database.
     * @param {SafetyIndicatorCreateManyAndReturnArgs} args - Arguments to create many SafetyIndicators.
     * @example
     * // Create many SafetyIndicators
     * const safetyIndicator = await prisma.safetyIndicator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SafetyIndicators and only return the `id`
     * const safetyIndicatorWithIdOnly = await prisma.safetyIndicator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SafetyIndicatorCreateManyAndReturnArgs>(args?: SelectSubset<T, SafetyIndicatorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SafetyIndicator.
     * @param {SafetyIndicatorDeleteArgs} args - Arguments to delete one SafetyIndicator.
     * @example
     * // Delete one SafetyIndicator
     * const SafetyIndicator = await prisma.safetyIndicator.delete({
     *   where: {
     *     // ... filter to delete one SafetyIndicator
     *   }
     * })
     * 
     */
    delete<T extends SafetyIndicatorDeleteArgs>(args: SelectSubset<T, SafetyIndicatorDeleteArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SafetyIndicator.
     * @param {SafetyIndicatorUpdateArgs} args - Arguments to update one SafetyIndicator.
     * @example
     * // Update one SafetyIndicator
     * const safetyIndicator = await prisma.safetyIndicator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SafetyIndicatorUpdateArgs>(args: SelectSubset<T, SafetyIndicatorUpdateArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SafetyIndicators.
     * @param {SafetyIndicatorDeleteManyArgs} args - Arguments to filter SafetyIndicators to delete.
     * @example
     * // Delete a few SafetyIndicators
     * const { count } = await prisma.safetyIndicator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SafetyIndicatorDeleteManyArgs>(args?: SelectSubset<T, SafetyIndicatorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SafetyIndicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SafetyIndicators
     * const safetyIndicator = await prisma.safetyIndicator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SafetyIndicatorUpdateManyArgs>(args: SelectSubset<T, SafetyIndicatorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SafetyIndicators and returns the data updated in the database.
     * @param {SafetyIndicatorUpdateManyAndReturnArgs} args - Arguments to update many SafetyIndicators.
     * @example
     * // Update many SafetyIndicators
     * const safetyIndicator = await prisma.safetyIndicator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SafetyIndicators and only return the `id`
     * const safetyIndicatorWithIdOnly = await prisma.safetyIndicator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SafetyIndicatorUpdateManyAndReturnArgs>(args: SelectSubset<T, SafetyIndicatorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SafetyIndicator.
     * @param {SafetyIndicatorUpsertArgs} args - Arguments to update or create a SafetyIndicator.
     * @example
     * // Update or create a SafetyIndicator
     * const safetyIndicator = await prisma.safetyIndicator.upsert({
     *   create: {
     *     // ... data to create a SafetyIndicator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SafetyIndicator we want to update
     *   }
     * })
     */
    upsert<T extends SafetyIndicatorUpsertArgs>(args: SelectSubset<T, SafetyIndicatorUpsertArgs<ExtArgs>>): Prisma__SafetyIndicatorClient<$Result.GetResult<Prisma.$SafetyIndicatorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SafetyIndicators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorCountArgs} args - Arguments to filter SafetyIndicators to count.
     * @example
     * // Count the number of SafetyIndicators
     * const count = await prisma.safetyIndicator.count({
     *   where: {
     *     // ... the filter for the SafetyIndicators we want to count
     *   }
     * })
    **/
    count<T extends SafetyIndicatorCountArgs>(
      args?: Subset<T, SafetyIndicatorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SafetyIndicatorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SafetyIndicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SafetyIndicatorAggregateArgs>(args: Subset<T, SafetyIndicatorAggregateArgs>): Prisma.PrismaPromise<GetSafetyIndicatorAggregateType<T>>

    /**
     * Group by SafetyIndicator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SafetyIndicatorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SafetyIndicatorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SafetyIndicatorGroupByArgs['orderBy'] }
        : { orderBy?: SafetyIndicatorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SafetyIndicatorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSafetyIndicatorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SafetyIndicator model
   */
  readonly fields: SafetyIndicatorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SafetyIndicator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SafetyIndicatorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SafetyIndicator model
   */
  interface SafetyIndicatorFieldRefs {
    readonly id: FieldRef<"SafetyIndicator", 'Int'>
    readonly level: FieldRef<"SafetyIndicator", 'SafetyLevel'>
    readonly reason: FieldRef<"SafetyIndicator", 'String'>
    readonly updatedAt: FieldRef<"SafetyIndicator", 'DateTime'>
    readonly locationId: FieldRef<"SafetyIndicator", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * SafetyIndicator findUnique
   */
  export type SafetyIndicatorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which SafetyIndicator to fetch.
     */
    where: SafetyIndicatorWhereUniqueInput
  }

  /**
   * SafetyIndicator findUniqueOrThrow
   */
  export type SafetyIndicatorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which SafetyIndicator to fetch.
     */
    where: SafetyIndicatorWhereUniqueInput
  }

  /**
   * SafetyIndicator findFirst
   */
  export type SafetyIndicatorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which SafetyIndicator to fetch.
     */
    where?: SafetyIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafetyIndicators to fetch.
     */
    orderBy?: SafetyIndicatorOrderByWithRelationInput | SafetyIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SafetyIndicators.
     */
    cursor?: SafetyIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafetyIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafetyIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SafetyIndicators.
     */
    distinct?: SafetyIndicatorScalarFieldEnum | SafetyIndicatorScalarFieldEnum[]
  }

  /**
   * SafetyIndicator findFirstOrThrow
   */
  export type SafetyIndicatorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which SafetyIndicator to fetch.
     */
    where?: SafetyIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafetyIndicators to fetch.
     */
    orderBy?: SafetyIndicatorOrderByWithRelationInput | SafetyIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SafetyIndicators.
     */
    cursor?: SafetyIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafetyIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafetyIndicators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SafetyIndicators.
     */
    distinct?: SafetyIndicatorScalarFieldEnum | SafetyIndicatorScalarFieldEnum[]
  }

  /**
   * SafetyIndicator findMany
   */
  export type SafetyIndicatorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * Filter, which SafetyIndicators to fetch.
     */
    where?: SafetyIndicatorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SafetyIndicators to fetch.
     */
    orderBy?: SafetyIndicatorOrderByWithRelationInput | SafetyIndicatorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SafetyIndicators.
     */
    cursor?: SafetyIndicatorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SafetyIndicators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SafetyIndicators.
     */
    skip?: number
    distinct?: SafetyIndicatorScalarFieldEnum | SafetyIndicatorScalarFieldEnum[]
  }

  /**
   * SafetyIndicator create
   */
  export type SafetyIndicatorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * The data needed to create a SafetyIndicator.
     */
    data: XOR<SafetyIndicatorCreateInput, SafetyIndicatorUncheckedCreateInput>
  }

  /**
   * SafetyIndicator createMany
   */
  export type SafetyIndicatorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SafetyIndicators.
     */
    data: SafetyIndicatorCreateManyInput | SafetyIndicatorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SafetyIndicator createManyAndReturn
   */
  export type SafetyIndicatorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * The data used to create many SafetyIndicators.
     */
    data: SafetyIndicatorCreateManyInput | SafetyIndicatorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SafetyIndicator update
   */
  export type SafetyIndicatorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * The data needed to update a SafetyIndicator.
     */
    data: XOR<SafetyIndicatorUpdateInput, SafetyIndicatorUncheckedUpdateInput>
    /**
     * Choose, which SafetyIndicator to update.
     */
    where: SafetyIndicatorWhereUniqueInput
  }

  /**
   * SafetyIndicator updateMany
   */
  export type SafetyIndicatorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SafetyIndicators.
     */
    data: XOR<SafetyIndicatorUpdateManyMutationInput, SafetyIndicatorUncheckedUpdateManyInput>
    /**
     * Filter which SafetyIndicators to update
     */
    where?: SafetyIndicatorWhereInput
    /**
     * Limit how many SafetyIndicators to update.
     */
    limit?: number
  }

  /**
   * SafetyIndicator updateManyAndReturn
   */
  export type SafetyIndicatorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * The data used to update SafetyIndicators.
     */
    data: XOR<SafetyIndicatorUpdateManyMutationInput, SafetyIndicatorUncheckedUpdateManyInput>
    /**
     * Filter which SafetyIndicators to update
     */
    where?: SafetyIndicatorWhereInput
    /**
     * Limit how many SafetyIndicators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SafetyIndicator upsert
   */
  export type SafetyIndicatorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * The filter to search for the SafetyIndicator to update in case it exists.
     */
    where: SafetyIndicatorWhereUniqueInput
    /**
     * In case the SafetyIndicator found by the `where` argument doesn't exist, create a new SafetyIndicator with this data.
     */
    create: XOR<SafetyIndicatorCreateInput, SafetyIndicatorUncheckedCreateInput>
    /**
     * In case the SafetyIndicator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SafetyIndicatorUpdateInput, SafetyIndicatorUncheckedUpdateInput>
  }

  /**
   * SafetyIndicator delete
   */
  export type SafetyIndicatorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
    /**
     * Filter which SafetyIndicator to delete.
     */
    where: SafetyIndicatorWhereUniqueInput
  }

  /**
   * SafetyIndicator deleteMany
   */
  export type SafetyIndicatorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SafetyIndicators to delete
     */
    where?: SafetyIndicatorWhereInput
    /**
     * Limit how many SafetyIndicators to delete.
     */
    limit?: number
  }

  /**
   * SafetyIndicator without action
   */
  export type SafetyIndicatorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SafetyIndicator
     */
    select?: SafetyIndicatorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SafetyIndicator
     */
    omit?: SafetyIndicatorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SafetyIndicatorInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AdminScalarFieldEnum: {
    id: 'id',
    cognitoId: 'cognitoId',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    superUser: 'superUser'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const LandlordScalarFieldEnum: {
    id: 'id',
    cognitoId: 'cognitoId',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber'
  };

  export type LandlordScalarFieldEnum = (typeof LandlordScalarFieldEnum)[keyof typeof LandlordScalarFieldEnum]


  export const TenantScalarFieldEnum: {
    id: 'id',
    cognitoId: 'cognitoId',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber'
  };

  export type TenantScalarFieldEnum = (typeof TenantScalarFieldEnum)[keyof typeof TenantScalarFieldEnum]


  export const PropertyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    pricePerMonth: 'pricePerMonth',
    securityDeposit: 'securityDeposit',
    applicationFee: 'applicationFee',
    photoUrls: 'photoUrls',
    amenities: 'amenities',
    highlights: 'highlights',
    isPetsAllowed: 'isPetsAllowed',
    isParkingIncluded: 'isParkingIncluded',
    isBachelorFriendly: 'isBachelorFriendly',
    isFemaleOnly: 'isFemaleOnly',
    genderPreference: 'genderPreference',
    beds: 'beds',
    baths: 'baths',
    squareFeet: 'squareFeet',
    propertyType: 'propertyType',
    postedDate: 'postedDate',
    averageRating: 'averageRating',
    numberOfReviews: 'numberOfReviews',
    locationId: 'locationId',
    landlordCognitoId: 'landlordCognitoId'
  };

  export type PropertyScalarFieldEnum = (typeof PropertyScalarFieldEnum)[keyof typeof PropertyScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    address: 'address',
    city: 'city',
    state: 'state',
    country: 'country',
    postalCode: 'postalCode'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const ApplicationScalarFieldEnum: {
    id: 'id',
    applicationDate: 'applicationDate',
    status: 'status',
    propertyId: 'propertyId',
    tenantCognitoId: 'tenantCognitoId',
    name: 'name',
    email: 'email',
    phoneNumber: 'phoneNumber',
    message: 'message',
    leaseId: 'leaseId'
  };

  export type ApplicationScalarFieldEnum = (typeof ApplicationScalarFieldEnum)[keyof typeof ApplicationScalarFieldEnum]


  export const LeaseScalarFieldEnum: {
    id: 'id',
    startDate: 'startDate',
    endDate: 'endDate',
    rent: 'rent',
    deposit: 'deposit',
    propertyId: 'propertyId',
    tenantCognitoId: 'tenantCognitoId'
  };

  export type LeaseScalarFieldEnum = (typeof LeaseScalarFieldEnum)[keyof typeof LeaseScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    amountDue: 'amountDue',
    amountPaid: 'amountPaid',
    dueDate: 'dueDate',
    paymentDate: 'paymentDate',
    paymentStatus: 'paymentStatus',
    leaseId: 'leaseId'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    tenantId: 'tenantId',
    landlordId: 'landlordId',
    locationId: 'locationId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const SafetyIndicatorScalarFieldEnum: {
    id: 'id',
    level: 'level',
    reason: 'reason',
    updatedAt: 'updatedAt',
    locationId: 'locationId'
  };

  export type SafetyIndicatorScalarFieldEnum = (typeof SafetyIndicatorScalarFieldEnum)[keyof typeof SafetyIndicatorScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Amenity[]'
   */
  export type ListEnumAmenityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Amenity[]'>
    


  /**
   * Reference to a field of type 'Amenity'
   */
  export type EnumAmenityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Amenity'>
    


  /**
   * Reference to a field of type 'Highlight[]'
   */
  export type ListEnumHighlightFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Highlight[]'>
    


  /**
   * Reference to a field of type 'Highlight'
   */
  export type EnumHighlightFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Highlight'>
    


  /**
   * Reference to a field of type 'GenderPreference'
   */
  export type EnumGenderPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenderPreference'>
    


  /**
   * Reference to a field of type 'GenderPreference[]'
   */
  export type ListEnumGenderPreferenceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GenderPreference[]'>
    


  /**
   * Reference to a field of type 'PropertyType'
   */
  export type EnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType'>
    


  /**
   * Reference to a field of type 'PropertyType[]'
   */
  export type ListEnumPropertyTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PropertyType[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ApplicationStatus'
   */
  export type EnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus'>
    


  /**
   * Reference to a field of type 'ApplicationStatus[]'
   */
  export type ListEnumApplicationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ApplicationStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    


  /**
   * Reference to a field of type 'SafetyLevel'
   */
  export type EnumSafetyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SafetyLevel'>
    


  /**
   * Reference to a field of type 'SafetyLevel[]'
   */
  export type ListEnumSafetyLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SafetyLevel[]'>
    
  /**
   * Deep Input Types
   */


  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: IntFilter<"Admin"> | number
    cognitoId?: StringFilter<"Admin"> | string
    name?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    phoneNumber?: StringFilter<"Admin"> | string
    superUser?: BoolFilter<"Admin"> | boolean
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    superUser?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cognitoId?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    name?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    phoneNumber?: StringFilter<"Admin"> | string
    superUser?: BoolFilter<"Admin"> | boolean
  }, "id" | "cognitoId">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    superUser?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _avg?: AdminAvgOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
    _sum?: AdminSumOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Admin"> | number
    cognitoId?: StringWithAggregatesFilter<"Admin"> | string
    name?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    phoneNumber?: StringWithAggregatesFilter<"Admin"> | string
    superUser?: BoolWithAggregatesFilter<"Admin"> | boolean
  }

  export type LandlordWhereInput = {
    AND?: LandlordWhereInput | LandlordWhereInput[]
    OR?: LandlordWhereInput[]
    NOT?: LandlordWhereInput | LandlordWhereInput[]
    id?: IntFilter<"Landlord"> | number
    cognitoId?: StringFilter<"Landlord"> | string
    name?: StringFilter<"Landlord"> | string
    email?: StringFilter<"Landlord"> | string
    phoneNumber?: StringFilter<"Landlord"> | string
    properties?: PropertyListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type LandlordOrderByWithRelationInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    properties?: PropertyOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type LandlordWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cognitoId?: string
    AND?: LandlordWhereInput | LandlordWhereInput[]
    OR?: LandlordWhereInput[]
    NOT?: LandlordWhereInput | LandlordWhereInput[]
    name?: StringFilter<"Landlord"> | string
    email?: StringFilter<"Landlord"> | string
    phoneNumber?: StringFilter<"Landlord"> | string
    properties?: PropertyListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "cognitoId">

  export type LandlordOrderByWithAggregationInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    _count?: LandlordCountOrderByAggregateInput
    _avg?: LandlordAvgOrderByAggregateInput
    _max?: LandlordMaxOrderByAggregateInput
    _min?: LandlordMinOrderByAggregateInput
    _sum?: LandlordSumOrderByAggregateInput
  }

  export type LandlordScalarWhereWithAggregatesInput = {
    AND?: LandlordScalarWhereWithAggregatesInput | LandlordScalarWhereWithAggregatesInput[]
    OR?: LandlordScalarWhereWithAggregatesInput[]
    NOT?: LandlordScalarWhereWithAggregatesInput | LandlordScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Landlord"> | number
    cognitoId?: StringWithAggregatesFilter<"Landlord"> | string
    name?: StringWithAggregatesFilter<"Landlord"> | string
    email?: StringWithAggregatesFilter<"Landlord"> | string
    phoneNumber?: StringWithAggregatesFilter<"Landlord"> | string
  }

  export type TenantWhereInput = {
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    id?: IntFilter<"Tenant"> | number
    cognitoId?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    email?: StringFilter<"Tenant"> | string
    phoneNumber?: StringFilter<"Tenant"> | string
    properties?: PropertyListRelationFilter
    favorites?: PropertyListRelationFilter
    applications?: ApplicationListRelationFilter
    leases?: LeaseListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type TenantOrderByWithRelationInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    properties?: PropertyOrderByRelationAggregateInput
    favorites?: PropertyOrderByRelationAggregateInput
    applications?: ApplicationOrderByRelationAggregateInput
    leases?: LeaseOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type TenantWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    cognitoId?: string
    AND?: TenantWhereInput | TenantWhereInput[]
    OR?: TenantWhereInput[]
    NOT?: TenantWhereInput | TenantWhereInput[]
    name?: StringFilter<"Tenant"> | string
    email?: StringFilter<"Tenant"> | string
    phoneNumber?: StringFilter<"Tenant"> | string
    properties?: PropertyListRelationFilter
    favorites?: PropertyListRelationFilter
    applications?: ApplicationListRelationFilter
    leases?: LeaseListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id" | "cognitoId">

  export type TenantOrderByWithAggregationInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    _count?: TenantCountOrderByAggregateInput
    _avg?: TenantAvgOrderByAggregateInput
    _max?: TenantMaxOrderByAggregateInput
    _min?: TenantMinOrderByAggregateInput
    _sum?: TenantSumOrderByAggregateInput
  }

  export type TenantScalarWhereWithAggregatesInput = {
    AND?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    OR?: TenantScalarWhereWithAggregatesInput[]
    NOT?: TenantScalarWhereWithAggregatesInput | TenantScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tenant"> | number
    cognitoId?: StringWithAggregatesFilter<"Tenant"> | string
    name?: StringWithAggregatesFilter<"Tenant"> | string
    email?: StringWithAggregatesFilter<"Tenant"> | string
    phoneNumber?: StringWithAggregatesFilter<"Tenant"> | string
  }

  export type PropertyWhereInput = {
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    id?: IntFilter<"Property"> | number
    name?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    pricePerMonth?: FloatFilter<"Property"> | number
    securityDeposit?: FloatFilter<"Property"> | number
    applicationFee?: FloatFilter<"Property"> | number
    photoUrls?: StringNullableListFilter<"Property">
    amenities?: EnumAmenityNullableListFilter<"Property">
    highlights?: EnumHighlightNullableListFilter<"Property">
    isPetsAllowed?: BoolFilter<"Property"> | boolean
    isParkingIncluded?: BoolFilter<"Property"> | boolean
    isBachelorFriendly?: BoolFilter<"Property"> | boolean
    isFemaleOnly?: BoolFilter<"Property"> | boolean
    genderPreference?: EnumGenderPreferenceNullableFilter<"Property"> | $Enums.GenderPreference | null
    beds?: IntFilter<"Property"> | number
    baths?: FloatFilter<"Property"> | number
    squareFeet?: IntFilter<"Property"> | number
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    postedDate?: DateTimeFilter<"Property"> | Date | string
    averageRating?: FloatNullableFilter<"Property"> | number | null
    numberOfReviews?: IntNullableFilter<"Property"> | number | null
    locationId?: IntFilter<"Property"> | number
    landlordCognitoId?: StringFilter<"Property"> | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    landlord?: XOR<LandlordScalarRelationFilter, LandlordWhereInput>
    leases?: LeaseListRelationFilter
    applications?: ApplicationListRelationFilter
    favoritedBy?: TenantListRelationFilter
    tenants?: TenantListRelationFilter
  }

  export type PropertyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    photoUrls?: SortOrder
    amenities?: SortOrder
    highlights?: SortOrder
    isPetsAllowed?: SortOrder
    isParkingIncluded?: SortOrder
    isBachelorFriendly?: SortOrder
    isFemaleOnly?: SortOrder
    genderPreference?: SortOrderInput | SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    propertyType?: SortOrder
    postedDate?: SortOrder
    averageRating?: SortOrderInput | SortOrder
    numberOfReviews?: SortOrderInput | SortOrder
    locationId?: SortOrder
    landlordCognitoId?: SortOrder
    location?: LocationOrderByWithRelationInput
    landlord?: LandlordOrderByWithRelationInput
    leases?: LeaseOrderByRelationAggregateInput
    applications?: ApplicationOrderByRelationAggregateInput
    favoritedBy?: TenantOrderByRelationAggregateInput
    tenants?: TenantOrderByRelationAggregateInput
  }

  export type PropertyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PropertyWhereInput | PropertyWhereInput[]
    OR?: PropertyWhereInput[]
    NOT?: PropertyWhereInput | PropertyWhereInput[]
    name?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    pricePerMonth?: FloatFilter<"Property"> | number
    securityDeposit?: FloatFilter<"Property"> | number
    applicationFee?: FloatFilter<"Property"> | number
    photoUrls?: StringNullableListFilter<"Property">
    amenities?: EnumAmenityNullableListFilter<"Property">
    highlights?: EnumHighlightNullableListFilter<"Property">
    isPetsAllowed?: BoolFilter<"Property"> | boolean
    isParkingIncluded?: BoolFilter<"Property"> | boolean
    isBachelorFriendly?: BoolFilter<"Property"> | boolean
    isFemaleOnly?: BoolFilter<"Property"> | boolean
    genderPreference?: EnumGenderPreferenceNullableFilter<"Property"> | $Enums.GenderPreference | null
    beds?: IntFilter<"Property"> | number
    baths?: FloatFilter<"Property"> | number
    squareFeet?: IntFilter<"Property"> | number
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    postedDate?: DateTimeFilter<"Property"> | Date | string
    averageRating?: FloatNullableFilter<"Property"> | number | null
    numberOfReviews?: IntNullableFilter<"Property"> | number | null
    locationId?: IntFilter<"Property"> | number
    landlordCognitoId?: StringFilter<"Property"> | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    landlord?: XOR<LandlordScalarRelationFilter, LandlordWhereInput>
    leases?: LeaseListRelationFilter
    applications?: ApplicationListRelationFilter
    favoritedBy?: TenantListRelationFilter
    tenants?: TenantListRelationFilter
  }, "id">

  export type PropertyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    photoUrls?: SortOrder
    amenities?: SortOrder
    highlights?: SortOrder
    isPetsAllowed?: SortOrder
    isParkingIncluded?: SortOrder
    isBachelorFriendly?: SortOrder
    isFemaleOnly?: SortOrder
    genderPreference?: SortOrderInput | SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    propertyType?: SortOrder
    postedDate?: SortOrder
    averageRating?: SortOrderInput | SortOrder
    numberOfReviews?: SortOrderInput | SortOrder
    locationId?: SortOrder
    landlordCognitoId?: SortOrder
    _count?: PropertyCountOrderByAggregateInput
    _avg?: PropertyAvgOrderByAggregateInput
    _max?: PropertyMaxOrderByAggregateInput
    _min?: PropertyMinOrderByAggregateInput
    _sum?: PropertySumOrderByAggregateInput
  }

  export type PropertyScalarWhereWithAggregatesInput = {
    AND?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    OR?: PropertyScalarWhereWithAggregatesInput[]
    NOT?: PropertyScalarWhereWithAggregatesInput | PropertyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Property"> | number
    name?: StringWithAggregatesFilter<"Property"> | string
    description?: StringWithAggregatesFilter<"Property"> | string
    pricePerMonth?: FloatWithAggregatesFilter<"Property"> | number
    securityDeposit?: FloatWithAggregatesFilter<"Property"> | number
    applicationFee?: FloatWithAggregatesFilter<"Property"> | number
    photoUrls?: StringNullableListFilter<"Property">
    amenities?: EnumAmenityNullableListFilter<"Property">
    highlights?: EnumHighlightNullableListFilter<"Property">
    isPetsAllowed?: BoolWithAggregatesFilter<"Property"> | boolean
    isParkingIncluded?: BoolWithAggregatesFilter<"Property"> | boolean
    isBachelorFriendly?: BoolWithAggregatesFilter<"Property"> | boolean
    isFemaleOnly?: BoolWithAggregatesFilter<"Property"> | boolean
    genderPreference?: EnumGenderPreferenceNullableWithAggregatesFilter<"Property"> | $Enums.GenderPreference | null
    beds?: IntWithAggregatesFilter<"Property"> | number
    baths?: FloatWithAggregatesFilter<"Property"> | number
    squareFeet?: IntWithAggregatesFilter<"Property"> | number
    propertyType?: EnumPropertyTypeWithAggregatesFilter<"Property"> | $Enums.PropertyType
    postedDate?: DateTimeWithAggregatesFilter<"Property"> | Date | string
    averageRating?: FloatNullableWithAggregatesFilter<"Property"> | number | null
    numberOfReviews?: IntNullableWithAggregatesFilter<"Property"> | number | null
    locationId?: IntWithAggregatesFilter<"Property"> | number
    landlordCognitoId?: StringWithAggregatesFilter<"Property"> | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: IntFilter<"Location"> | number
    address?: StringFilter<"Location"> | string
    city?: StringFilter<"Location"> | string
    state?: StringFilter<"Location"> | string
    country?: StringFilter<"Location"> | string
    postalCode?: StringFilter<"Location"> | string
    properties?: PropertyListRelationFilter
    safetyIndicators?: SafetyIndicatorListRelationFilter
    reviews?: ReviewListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    properties?: PropertyOrderByRelationAggregateInput
    safetyIndicators?: SafetyIndicatorOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    address?: StringFilter<"Location"> | string
    city?: StringFilter<"Location"> | string
    state?: StringFilter<"Location"> | string
    country?: StringFilter<"Location"> | string
    postalCode?: StringFilter<"Location"> | string
    properties?: PropertyListRelationFilter
    safetyIndicators?: SafetyIndicatorListRelationFilter
    reviews?: ReviewListRelationFilter
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _avg?: LocationAvgOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
    _sum?: LocationSumOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Location"> | number
    address?: StringWithAggregatesFilter<"Location"> | string
    city?: StringWithAggregatesFilter<"Location"> | string
    state?: StringWithAggregatesFilter<"Location"> | string
    country?: StringWithAggregatesFilter<"Location"> | string
    postalCode?: StringWithAggregatesFilter<"Location"> | string
  }

  export type ApplicationWhereInput = {
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    id?: IntFilter<"Application"> | number
    applicationDate?: DateTimeFilter<"Application"> | Date | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    propertyId?: IntFilter<"Application"> | number
    tenantCognitoId?: StringFilter<"Application"> | string
    name?: StringFilter<"Application"> | string
    email?: StringFilter<"Application"> | string
    phoneNumber?: StringFilter<"Application"> | string
    message?: StringNullableFilter<"Application"> | string | null
    leaseId?: IntNullableFilter<"Application"> | number | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    lease?: XOR<LeaseNullableScalarRelationFilter, LeaseWhereInput> | null
  }

  export type ApplicationOrderByWithRelationInput = {
    id?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrderInput | SortOrder
    leaseId?: SortOrderInput | SortOrder
    property?: PropertyOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
    lease?: LeaseOrderByWithRelationInput
  }

  export type ApplicationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    leaseId?: number
    AND?: ApplicationWhereInput | ApplicationWhereInput[]
    OR?: ApplicationWhereInput[]
    NOT?: ApplicationWhereInput | ApplicationWhereInput[]
    applicationDate?: DateTimeFilter<"Application"> | Date | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    propertyId?: IntFilter<"Application"> | number
    tenantCognitoId?: StringFilter<"Application"> | string
    name?: StringFilter<"Application"> | string
    email?: StringFilter<"Application"> | string
    phoneNumber?: StringFilter<"Application"> | string
    message?: StringNullableFilter<"Application"> | string | null
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    lease?: XOR<LeaseNullableScalarRelationFilter, LeaseWhereInput> | null
  }, "id" | "leaseId">

  export type ApplicationOrderByWithAggregationInput = {
    id?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrderInput | SortOrder
    leaseId?: SortOrderInput | SortOrder
    _count?: ApplicationCountOrderByAggregateInput
    _avg?: ApplicationAvgOrderByAggregateInput
    _max?: ApplicationMaxOrderByAggregateInput
    _min?: ApplicationMinOrderByAggregateInput
    _sum?: ApplicationSumOrderByAggregateInput
  }

  export type ApplicationScalarWhereWithAggregatesInput = {
    AND?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    OR?: ApplicationScalarWhereWithAggregatesInput[]
    NOT?: ApplicationScalarWhereWithAggregatesInput | ApplicationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Application"> | number
    applicationDate?: DateTimeWithAggregatesFilter<"Application"> | Date | string
    status?: EnumApplicationStatusWithAggregatesFilter<"Application"> | $Enums.ApplicationStatus
    propertyId?: IntWithAggregatesFilter<"Application"> | number
    tenantCognitoId?: StringWithAggregatesFilter<"Application"> | string
    name?: StringWithAggregatesFilter<"Application"> | string
    email?: StringWithAggregatesFilter<"Application"> | string
    phoneNumber?: StringWithAggregatesFilter<"Application"> | string
    message?: StringNullableWithAggregatesFilter<"Application"> | string | null
    leaseId?: IntNullableWithAggregatesFilter<"Application"> | number | null
  }

  export type LeaseWhereInput = {
    AND?: LeaseWhereInput | LeaseWhereInput[]
    OR?: LeaseWhereInput[]
    NOT?: LeaseWhereInput | LeaseWhereInput[]
    id?: IntFilter<"Lease"> | number
    startDate?: DateTimeFilter<"Lease"> | Date | string
    endDate?: DateTimeFilter<"Lease"> | Date | string
    rent?: FloatFilter<"Lease"> | number
    deposit?: FloatFilter<"Lease"> | number
    propertyId?: IntFilter<"Lease"> | number
    tenantCognitoId?: StringFilter<"Lease"> | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    application?: XOR<ApplicationNullableScalarRelationFilter, ApplicationWhereInput> | null
    payments?: PaymentListRelationFilter
  }

  export type LeaseOrderByWithRelationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    property?: PropertyOrderByWithRelationInput
    tenant?: TenantOrderByWithRelationInput
    application?: ApplicationOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type LeaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: LeaseWhereInput | LeaseWhereInput[]
    OR?: LeaseWhereInput[]
    NOT?: LeaseWhereInput | LeaseWhereInput[]
    startDate?: DateTimeFilter<"Lease"> | Date | string
    endDate?: DateTimeFilter<"Lease"> | Date | string
    rent?: FloatFilter<"Lease"> | number
    deposit?: FloatFilter<"Lease"> | number
    propertyId?: IntFilter<"Lease"> | number
    tenantCognitoId?: StringFilter<"Lease"> | string
    property?: XOR<PropertyScalarRelationFilter, PropertyWhereInput>
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    application?: XOR<ApplicationNullableScalarRelationFilter, ApplicationWhereInput> | null
    payments?: PaymentListRelationFilter
  }, "id">

  export type LeaseOrderByWithAggregationInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    _count?: LeaseCountOrderByAggregateInput
    _avg?: LeaseAvgOrderByAggregateInput
    _max?: LeaseMaxOrderByAggregateInput
    _min?: LeaseMinOrderByAggregateInput
    _sum?: LeaseSumOrderByAggregateInput
  }

  export type LeaseScalarWhereWithAggregatesInput = {
    AND?: LeaseScalarWhereWithAggregatesInput | LeaseScalarWhereWithAggregatesInput[]
    OR?: LeaseScalarWhereWithAggregatesInput[]
    NOT?: LeaseScalarWhereWithAggregatesInput | LeaseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Lease"> | number
    startDate?: DateTimeWithAggregatesFilter<"Lease"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Lease"> | Date | string
    rent?: FloatWithAggregatesFilter<"Lease"> | number
    deposit?: FloatWithAggregatesFilter<"Lease"> | number
    propertyId?: IntWithAggregatesFilter<"Lease"> | number
    tenantCognitoId?: StringWithAggregatesFilter<"Lease"> | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    amountDue?: FloatFilter<"Payment"> | number
    amountPaid?: FloatFilter<"Payment"> | number
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    leaseId?: IntFilter<"Payment"> | number
    lease?: XOR<LeaseScalarRelationFilter, LeaseWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    paymentDate?: SortOrder
    paymentStatus?: SortOrder
    leaseId?: SortOrder
    lease?: LeaseOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    amountDue?: FloatFilter<"Payment"> | number
    amountPaid?: FloatFilter<"Payment"> | number
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    leaseId?: IntFilter<"Payment"> | number
    lease?: XOR<LeaseScalarRelationFilter, LeaseWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    paymentDate?: SortOrder
    paymentStatus?: SortOrder
    leaseId?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    amountDue?: FloatWithAggregatesFilter<"Payment"> | number
    amountPaid?: FloatWithAggregatesFilter<"Payment"> | number
    dueDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    paymentDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    paymentStatus?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    leaseId?: IntWithAggregatesFilter<"Payment"> | number
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    tenantId?: IntFilter<"Review"> | number
    landlordId?: IntFilter<"Review"> | number
    locationId?: IntFilter<"Review"> | number
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    landlord?: XOR<LandlordScalarRelationFilter, LandlordWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
    tenant?: TenantOrderByWithRelationInput
    landlord?: LandlordOrderByWithRelationInput
    location?: LocationOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    tenantId?: IntFilter<"Review"> | number
    landlordId?: IntFilter<"Review"> | number
    locationId?: IntFilter<"Review"> | number
    tenant?: XOR<TenantScalarRelationFilter, TenantWhereInput>
    landlord?: XOR<LandlordScalarRelationFilter, LandlordWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Review"> | number
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringNullableWithAggregatesFilter<"Review"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    tenantId?: IntWithAggregatesFilter<"Review"> | number
    landlordId?: IntWithAggregatesFilter<"Review"> | number
    locationId?: IntWithAggregatesFilter<"Review"> | number
  }

  export type SafetyIndicatorWhereInput = {
    AND?: SafetyIndicatorWhereInput | SafetyIndicatorWhereInput[]
    OR?: SafetyIndicatorWhereInput[]
    NOT?: SafetyIndicatorWhereInput | SafetyIndicatorWhereInput[]
    id?: IntFilter<"SafetyIndicator"> | number
    level?: EnumSafetyLevelFilter<"SafetyIndicator"> | $Enums.SafetyLevel
    reason?: StringFilter<"SafetyIndicator"> | string
    updatedAt?: DateTimeFilter<"SafetyIndicator"> | Date | string
    locationId?: IntFilter<"SafetyIndicator"> | number
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }

  export type SafetyIndicatorOrderByWithRelationInput = {
    id?: SortOrder
    level?: SortOrder
    reason?: SortOrder
    updatedAt?: SortOrder
    locationId?: SortOrder
    location?: LocationOrderByWithRelationInput
  }

  export type SafetyIndicatorWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SafetyIndicatorWhereInput | SafetyIndicatorWhereInput[]
    OR?: SafetyIndicatorWhereInput[]
    NOT?: SafetyIndicatorWhereInput | SafetyIndicatorWhereInput[]
    level?: EnumSafetyLevelFilter<"SafetyIndicator"> | $Enums.SafetyLevel
    reason?: StringFilter<"SafetyIndicator"> | string
    updatedAt?: DateTimeFilter<"SafetyIndicator"> | Date | string
    locationId?: IntFilter<"SafetyIndicator"> | number
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
  }, "id">

  export type SafetyIndicatorOrderByWithAggregationInput = {
    id?: SortOrder
    level?: SortOrder
    reason?: SortOrder
    updatedAt?: SortOrder
    locationId?: SortOrder
    _count?: SafetyIndicatorCountOrderByAggregateInput
    _avg?: SafetyIndicatorAvgOrderByAggregateInput
    _max?: SafetyIndicatorMaxOrderByAggregateInput
    _min?: SafetyIndicatorMinOrderByAggregateInput
    _sum?: SafetyIndicatorSumOrderByAggregateInput
  }

  export type SafetyIndicatorScalarWhereWithAggregatesInput = {
    AND?: SafetyIndicatorScalarWhereWithAggregatesInput | SafetyIndicatorScalarWhereWithAggregatesInput[]
    OR?: SafetyIndicatorScalarWhereWithAggregatesInput[]
    NOT?: SafetyIndicatorScalarWhereWithAggregatesInput | SafetyIndicatorScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SafetyIndicator"> | number
    level?: EnumSafetyLevelWithAggregatesFilter<"SafetyIndicator"> | $Enums.SafetyLevel
    reason?: StringWithAggregatesFilter<"SafetyIndicator"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SafetyIndicator"> | Date | string
    locationId?: IntWithAggregatesFilter<"SafetyIndicator"> | number
  }

  export type AdminCreateInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    superUser?: boolean
  }

  export type AdminUncheckedCreateInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    superUser?: boolean
  }

  export type AdminUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    superUser?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    superUser?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminCreateManyInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    superUser?: boolean
  }

  export type AdminUpdateManyMutationInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    superUser?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    superUser?: BoolFieldUpdateOperationsInput | boolean
  }

  export type LandlordCreateInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutLandlordInput
    reviews?: ReviewCreateNestedManyWithoutLandlordInput
  }

  export type LandlordUncheckedCreateInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutLandlordInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutLandlordInput
  }

  export type LandlordUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutLandlordNestedInput
    reviews?: ReviewUpdateManyWithoutLandlordNestedInput
  }

  export type LandlordUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutLandlordNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutLandlordNestedInput
  }

  export type LandlordCreateManyInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
  }

  export type LandlordUpdateManyMutationInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type LandlordUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type TenantCreateInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutTenantsInput
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationCreateNestedManyWithoutTenantInput
    leases?: LeaseCreateNestedManyWithoutTenantInput
    reviews?: ReviewCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutTenantsInput
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutTenantInput
    leases?: LeaseUncheckedCreateNestedManyWithoutTenantInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantUpdateInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUpdateManyWithoutTenantNestedInput
    leases?: LeaseUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutTenantNestedInput
    leases?: LeaseUncheckedUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantCreateManyInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
  }

  export type TenantUpdateManyMutationInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type TenantUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyCreateInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    location: LocationCreateNestedOneWithoutPropertiesInput
    landlord: LandlordCreateNestedOneWithoutPropertiesInput
    leases?: LeaseCreateNestedManyWithoutPropertyInput
    applications?: ApplicationCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantCreateNestedManyWithoutFavoritesInput
    tenants?: TenantCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    landlordCognitoId: string
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantUncheckedCreateNestedManyWithoutFavoritesInput
    tenants?: TenantUncheckedCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutPropertiesNestedInput
    leases?: LeaseUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUncheckedUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUncheckedUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyCreateManyInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    landlordCognitoId: string
  }

  export type PropertyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PropertyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutLocationNestedInput
    safetyIndicators?: SafetyIndicatorUpdateManyWithoutLocationNestedInput
    reviews?: ReviewUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutLocationNestedInput
    safetyIndicators?: SafetyIndicatorUncheckedUpdateManyWithoutLocationNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUpdateManyMutationInput = {
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicationCreateInput = {
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    property: PropertyCreateNestedOneWithoutApplicationsInput
    tenant: TenantCreateNestedOneWithoutApplicationsInput
    lease?: LeaseCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    propertyId: number
    tenantCognitoId: string
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    leaseId?: number | null
  }

  export type ApplicationUpdateInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutApplicationsNestedInput
    tenant?: TenantUpdateOneRequiredWithoutApplicationsNestedInput
    lease?: LeaseUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicationCreateManyInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    propertyId: number
    tenantCognitoId: string
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    leaseId?: number | null
  }

  export type ApplicationUpdateManyMutationInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ApplicationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LeaseCreateInput = {
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    property: PropertyCreateNestedOneWithoutLeasesInput
    tenant: TenantCreateNestedOneWithoutLeasesInput
    application?: ApplicationCreateNestedOneWithoutLeaseInput
    payments?: PaymentCreateNestedManyWithoutLeaseInput
  }

  export type LeaseUncheckedCreateInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    propertyId: number
    tenantCognitoId: string
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput
  }

  export type LeaseUpdateInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutLeasesNestedInput
    application?: ApplicationUpdateOneWithoutLeaseNestedInput
    payments?: PaymentUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseCreateManyInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    propertyId: number
    tenantCognitoId: string
  }

  export type LeaseUpdateManyMutationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
  }

  export type LeaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
  }

  export type PaymentCreateInput = {
    amountDue: number
    amountPaid: number
    dueDate: Date | string
    paymentDate: Date | string
    paymentStatus: $Enums.PaymentStatus
    lease: LeaseCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    amountDue: number
    amountPaid: number
    dueDate: Date | string
    paymentDate: Date | string
    paymentStatus: $Enums.PaymentStatus
    leaseId: number
  }

  export type PaymentUpdateInput = {
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    lease?: LeaseUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    leaseId?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateManyInput = {
    id?: number
    amountDue: number
    amountPaid: number
    dueDate: Date | string
    paymentDate: Date | string
    paymentStatus: $Enums.PaymentStatus
    leaseId: number
  }

  export type PaymentUpdateManyMutationInput = {
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    leaseId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateInput = {
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutReviewsInput
    landlord: LandlordCreateNestedOneWithoutReviewsInput
    location: LocationCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenantId: number
    landlordId: number
    locationId: number
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutReviewsNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutReviewsNestedInput
    location?: LocationUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: IntFieldUpdateOperationsInput | number
    landlordId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateManyInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenantId: number
    landlordId: number
    locationId: number
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: IntFieldUpdateOperationsInput | number
    landlordId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type SafetyIndicatorCreateInput = {
    level: $Enums.SafetyLevel
    reason: string
    updatedAt?: Date | string
    location: LocationCreateNestedOneWithoutSafetyIndicatorsInput
  }

  export type SafetyIndicatorUncheckedCreateInput = {
    id?: number
    level: $Enums.SafetyLevel
    reason: string
    updatedAt?: Date | string
    locationId: number
  }

  export type SafetyIndicatorUpdateInput = {
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutSafetyIndicatorsNestedInput
  }

  export type SafetyIndicatorUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type SafetyIndicatorCreateManyInput = {
    id?: number
    level: $Enums.SafetyLevel
    reason: string
    updatedAt?: Date | string
    locationId: number
  }

  export type SafetyIndicatorUpdateManyMutationInput = {
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafetyIndicatorUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    superUser?: SortOrder
  }

  export type AdminAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    superUser?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    superUser?: SortOrder
  }

  export type AdminSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PropertyListRelationFilter = {
    every?: PropertyWhereInput
    some?: PropertyWhereInput
    none?: PropertyWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type PropertyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LandlordCountOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
  }

  export type LandlordAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LandlordMaxOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
  }

  export type LandlordMinOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
  }

  export type LandlordSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ApplicationListRelationFilter = {
    every?: ApplicationWhereInput
    some?: ApplicationWhereInput
    none?: ApplicationWhereInput
  }

  export type LeaseListRelationFilter = {
    every?: LeaseWhereInput
    some?: LeaseWhereInput
    none?: LeaseWhereInput
  }

  export type ApplicationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TenantCountOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
  }

  export type TenantAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TenantMaxOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
  }

  export type TenantMinOrderByAggregateInput = {
    id?: SortOrder
    cognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
  }

  export type TenantSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumAmenityNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Amenity[] | ListEnumAmenityFieldRefInput<$PrismaModel> | null
    has?: $Enums.Amenity | EnumAmenityFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Amenity[] | ListEnumAmenityFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Amenity[] | ListEnumAmenityFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumHighlightNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Highlight[] | ListEnumHighlightFieldRefInput<$PrismaModel> | null
    has?: $Enums.Highlight | EnumHighlightFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Highlight[] | ListEnumHighlightFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Highlight[] | ListEnumHighlightFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumGenderPreferenceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderPreference | EnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderPreferenceNullableFilter<$PrismaModel> | $Enums.GenderPreference | null
  }

  export type EnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type LandlordScalarRelationFilter = {
    is?: LandlordWhereInput
    isNot?: LandlordWhereInput
  }

  export type TenantListRelationFilter = {
    every?: TenantWhereInput
    some?: TenantWhereInput
    none?: TenantWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TenantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PropertyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    photoUrls?: SortOrder
    amenities?: SortOrder
    highlights?: SortOrder
    isPetsAllowed?: SortOrder
    isParkingIncluded?: SortOrder
    isBachelorFriendly?: SortOrder
    isFemaleOnly?: SortOrder
    genderPreference?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    propertyType?: SortOrder
    postedDate?: SortOrder
    averageRating?: SortOrder
    numberOfReviews?: SortOrder
    locationId?: SortOrder
    landlordCognitoId?: SortOrder
  }

  export type PropertyAvgOrderByAggregateInput = {
    id?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    averageRating?: SortOrder
    numberOfReviews?: SortOrder
    locationId?: SortOrder
  }

  export type PropertyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    isPetsAllowed?: SortOrder
    isParkingIncluded?: SortOrder
    isBachelorFriendly?: SortOrder
    isFemaleOnly?: SortOrder
    genderPreference?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    propertyType?: SortOrder
    postedDate?: SortOrder
    averageRating?: SortOrder
    numberOfReviews?: SortOrder
    locationId?: SortOrder
    landlordCognitoId?: SortOrder
  }

  export type PropertyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    isPetsAllowed?: SortOrder
    isParkingIncluded?: SortOrder
    isBachelorFriendly?: SortOrder
    isFemaleOnly?: SortOrder
    genderPreference?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    propertyType?: SortOrder
    postedDate?: SortOrder
    averageRating?: SortOrder
    numberOfReviews?: SortOrder
    locationId?: SortOrder
    landlordCognitoId?: SortOrder
  }

  export type PropertySumOrderByAggregateInput = {
    id?: SortOrder
    pricePerMonth?: SortOrder
    securityDeposit?: SortOrder
    applicationFee?: SortOrder
    beds?: SortOrder
    baths?: SortOrder
    squareFeet?: SortOrder
    averageRating?: SortOrder
    numberOfReviews?: SortOrder
    locationId?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumGenderPreferenceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderPreference | EnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderPreferenceNullableWithAggregatesFilter<$PrismaModel> | $Enums.GenderPreference | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderPreferenceNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderPreferenceNullableFilter<$PrismaModel>
  }

  export type EnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SafetyIndicatorListRelationFilter = {
    every?: SafetyIndicatorWhereInput
    some?: SafetyIndicatorWhereInput
    none?: SafetyIndicatorWhereInput
  }

  export type SafetyIndicatorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
  }

  export type LocationAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    city?: SortOrder
    state?: SortOrder
    country?: SortOrder
    postalCode?: SortOrder
  }

  export type LocationSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PropertyScalarRelationFilter = {
    is?: PropertyWhereInput
    isNot?: PropertyWhereInput
  }

  export type TenantScalarRelationFilter = {
    is?: TenantWhereInput
    isNot?: TenantWhereInput
  }

  export type LeaseNullableScalarRelationFilter = {
    is?: LeaseWhereInput | null
    isNot?: LeaseWhereInput | null
  }

  export type ApplicationCountOrderByAggregateInput = {
    id?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    leaseId?: SortOrder
  }

  export type ApplicationAvgOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    leaseId?: SortOrder
  }

  export type ApplicationMaxOrderByAggregateInput = {
    id?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    leaseId?: SortOrder
  }

  export type ApplicationMinOrderByAggregateInput = {
    id?: SortOrder
    applicationDate?: SortOrder
    status?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    message?: SortOrder
    leaseId?: SortOrder
  }

  export type ApplicationSumOrderByAggregateInput = {
    id?: SortOrder
    propertyId?: SortOrder
    leaseId?: SortOrder
  }

  export type EnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ApplicationNullableScalarRelationFilter = {
    is?: ApplicationWhereInput | null
    isNot?: ApplicationWhereInput | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LeaseCountOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
  }

  export type LeaseAvgOrderByAggregateInput = {
    id?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
  }

  export type LeaseMaxOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
  }

  export type LeaseMinOrderByAggregateInput = {
    id?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
    tenantCognitoId?: SortOrder
  }

  export type LeaseSumOrderByAggregateInput = {
    id?: SortOrder
    rent?: SortOrder
    deposit?: SortOrder
    propertyId?: SortOrder
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type LeaseScalarRelationFilter = {
    is?: LeaseWhereInput
    isNot?: LeaseWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    paymentDate?: SortOrder
    paymentStatus?: SortOrder
    leaseId?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    leaseId?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    paymentDate?: SortOrder
    paymentStatus?: SortOrder
    leaseId?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    dueDate?: SortOrder
    paymentDate?: SortOrder
    paymentStatus?: SortOrder
    leaseId?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    amountDue?: SortOrder
    amountPaid?: SortOrder
    leaseId?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    id?: SortOrder
    rating?: SortOrder
    tenantId?: SortOrder
    landlordId?: SortOrder
    locationId?: SortOrder
  }

  export type EnumSafetyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.SafetyLevel | EnumSafetyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSafetyLevelFilter<$PrismaModel> | $Enums.SafetyLevel
  }

  export type SafetyIndicatorCountOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    reason?: SortOrder
    updatedAt?: SortOrder
    locationId?: SortOrder
  }

  export type SafetyIndicatorAvgOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
  }

  export type SafetyIndicatorMaxOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    reason?: SortOrder
    updatedAt?: SortOrder
    locationId?: SortOrder
  }

  export type SafetyIndicatorMinOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    reason?: SortOrder
    updatedAt?: SortOrder
    locationId?: SortOrder
  }

  export type SafetyIndicatorSumOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
  }

  export type EnumSafetyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SafetyLevel | EnumSafetyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSafetyLevelWithAggregatesFilter<$PrismaModel> | $Enums.SafetyLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSafetyLevelFilter<$PrismaModel>
    _max?: NestedEnumSafetyLevelFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PropertyCreateNestedManyWithoutLandlordInput = {
    create?: XOR<PropertyCreateWithoutLandlordInput, PropertyUncheckedCreateWithoutLandlordInput> | PropertyCreateWithoutLandlordInput[] | PropertyUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutLandlordInput | PropertyCreateOrConnectWithoutLandlordInput[]
    createMany?: PropertyCreateManyLandlordInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutLandlordInput = {
    create?: XOR<ReviewCreateWithoutLandlordInput, ReviewUncheckedCreateWithoutLandlordInput> | ReviewCreateWithoutLandlordInput[] | ReviewUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutLandlordInput | ReviewCreateOrConnectWithoutLandlordInput[]
    createMany?: ReviewCreateManyLandlordInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type PropertyUncheckedCreateNestedManyWithoutLandlordInput = {
    create?: XOR<PropertyCreateWithoutLandlordInput, PropertyUncheckedCreateWithoutLandlordInput> | PropertyCreateWithoutLandlordInput[] | PropertyUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutLandlordInput | PropertyCreateOrConnectWithoutLandlordInput[]
    createMany?: PropertyCreateManyLandlordInputEnvelope
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutLandlordInput = {
    create?: XOR<ReviewCreateWithoutLandlordInput, ReviewUncheckedCreateWithoutLandlordInput> | ReviewCreateWithoutLandlordInput[] | ReviewUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutLandlordInput | ReviewCreateOrConnectWithoutLandlordInput[]
    createMany?: ReviewCreateManyLandlordInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type PropertyUpdateManyWithoutLandlordNestedInput = {
    create?: XOR<PropertyCreateWithoutLandlordInput, PropertyUncheckedCreateWithoutLandlordInput> | PropertyCreateWithoutLandlordInput[] | PropertyUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutLandlordInput | PropertyCreateOrConnectWithoutLandlordInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutLandlordInput | PropertyUpsertWithWhereUniqueWithoutLandlordInput[]
    createMany?: PropertyCreateManyLandlordInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutLandlordInput | PropertyUpdateWithWhereUniqueWithoutLandlordInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutLandlordInput | PropertyUpdateManyWithWhereWithoutLandlordInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutLandlordNestedInput = {
    create?: XOR<ReviewCreateWithoutLandlordInput, ReviewUncheckedCreateWithoutLandlordInput> | ReviewCreateWithoutLandlordInput[] | ReviewUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutLandlordInput | ReviewCreateOrConnectWithoutLandlordInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutLandlordInput | ReviewUpsertWithWhereUniqueWithoutLandlordInput[]
    createMany?: ReviewCreateManyLandlordInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutLandlordInput | ReviewUpdateWithWhereUniqueWithoutLandlordInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutLandlordInput | ReviewUpdateManyWithWhereWithoutLandlordInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PropertyUncheckedUpdateManyWithoutLandlordNestedInput = {
    create?: XOR<PropertyCreateWithoutLandlordInput, PropertyUncheckedCreateWithoutLandlordInput> | PropertyCreateWithoutLandlordInput[] | PropertyUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutLandlordInput | PropertyCreateOrConnectWithoutLandlordInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutLandlordInput | PropertyUpsertWithWhereUniqueWithoutLandlordInput[]
    createMany?: PropertyCreateManyLandlordInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutLandlordInput | PropertyUpdateWithWhereUniqueWithoutLandlordInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutLandlordInput | PropertyUpdateManyWithWhereWithoutLandlordInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutLandlordNestedInput = {
    create?: XOR<ReviewCreateWithoutLandlordInput, ReviewUncheckedCreateWithoutLandlordInput> | ReviewCreateWithoutLandlordInput[] | ReviewUncheckedCreateWithoutLandlordInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutLandlordInput | ReviewCreateOrConnectWithoutLandlordInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutLandlordInput | ReviewUpsertWithWhereUniqueWithoutLandlordInput[]
    createMany?: ReviewCreateManyLandlordInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutLandlordInput | ReviewUpdateWithWhereUniqueWithoutLandlordInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutLandlordInput | ReviewUpdateManyWithWhereWithoutLandlordInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PropertyCreateNestedManyWithoutTenantsInput = {
    create?: XOR<PropertyCreateWithoutTenantsInput, PropertyUncheckedCreateWithoutTenantsInput> | PropertyCreateWithoutTenantsInput[] | PropertyUncheckedCreateWithoutTenantsInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutTenantsInput | PropertyCreateOrConnectWithoutTenantsInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type PropertyCreateNestedManyWithoutFavoritedByInput = {
    create?: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput> | PropertyCreateWithoutFavoritedByInput[] | PropertyUncheckedCreateWithoutFavoritedByInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type ApplicationCreateNestedManyWithoutTenantInput = {
    create?: XOR<ApplicationCreateWithoutTenantInput, ApplicationUncheckedCreateWithoutTenantInput> | ApplicationCreateWithoutTenantInput[] | ApplicationUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTenantInput | ApplicationCreateOrConnectWithoutTenantInput[]
    createMany?: ApplicationCreateManyTenantInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type LeaseCreateNestedManyWithoutTenantInput = {
    create?: XOR<LeaseCreateWithoutTenantInput, LeaseUncheckedCreateWithoutTenantInput> | LeaseCreateWithoutTenantInput[] | LeaseUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutTenantInput | LeaseCreateOrConnectWithoutTenantInput[]
    createMany?: LeaseCreateManyTenantInputEnvelope
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutTenantInput = {
    create?: XOR<ReviewCreateWithoutTenantInput, ReviewUncheckedCreateWithoutTenantInput> | ReviewCreateWithoutTenantInput[] | ReviewUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTenantInput | ReviewCreateOrConnectWithoutTenantInput[]
    createMany?: ReviewCreateManyTenantInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type PropertyUncheckedCreateNestedManyWithoutTenantsInput = {
    create?: XOR<PropertyCreateWithoutTenantsInput, PropertyUncheckedCreateWithoutTenantsInput> | PropertyCreateWithoutTenantsInput[] | PropertyUncheckedCreateWithoutTenantsInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutTenantsInput | PropertyCreateOrConnectWithoutTenantsInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type PropertyUncheckedCreateNestedManyWithoutFavoritedByInput = {
    create?: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput> | PropertyCreateWithoutFavoritedByInput[] | PropertyUncheckedCreateWithoutFavoritedByInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ApplicationCreateWithoutTenantInput, ApplicationUncheckedCreateWithoutTenantInput> | ApplicationCreateWithoutTenantInput[] | ApplicationUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTenantInput | ApplicationCreateOrConnectWithoutTenantInput[]
    createMany?: ApplicationCreateManyTenantInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type LeaseUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<LeaseCreateWithoutTenantInput, LeaseUncheckedCreateWithoutTenantInput> | LeaseCreateWithoutTenantInput[] | LeaseUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutTenantInput | LeaseCreateOrConnectWithoutTenantInput[]
    createMany?: LeaseCreateManyTenantInputEnvelope
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutTenantInput = {
    create?: XOR<ReviewCreateWithoutTenantInput, ReviewUncheckedCreateWithoutTenantInput> | ReviewCreateWithoutTenantInput[] | ReviewUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTenantInput | ReviewCreateOrConnectWithoutTenantInput[]
    createMany?: ReviewCreateManyTenantInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type PropertyUpdateManyWithoutTenantsNestedInput = {
    create?: XOR<PropertyCreateWithoutTenantsInput, PropertyUncheckedCreateWithoutTenantsInput> | PropertyCreateWithoutTenantsInput[] | PropertyUncheckedCreateWithoutTenantsInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutTenantsInput | PropertyCreateOrConnectWithoutTenantsInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutTenantsInput | PropertyUpsertWithWhereUniqueWithoutTenantsInput[]
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutTenantsInput | PropertyUpdateWithWhereUniqueWithoutTenantsInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutTenantsInput | PropertyUpdateManyWithWhereWithoutTenantsInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type PropertyUpdateManyWithoutFavoritedByNestedInput = {
    create?: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput> | PropertyCreateWithoutFavoritedByInput[] | PropertyUncheckedCreateWithoutFavoritedByInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutFavoritedByInput | PropertyUpsertWithWhereUniqueWithoutFavoritedByInput[]
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutFavoritedByInput | PropertyUpdateWithWhereUniqueWithoutFavoritedByInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutFavoritedByInput | PropertyUpdateManyWithWhereWithoutFavoritedByInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type ApplicationUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ApplicationCreateWithoutTenantInput, ApplicationUncheckedCreateWithoutTenantInput> | ApplicationCreateWithoutTenantInput[] | ApplicationUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTenantInput | ApplicationCreateOrConnectWithoutTenantInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutTenantInput | ApplicationUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ApplicationCreateManyTenantInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutTenantInput | ApplicationUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutTenantInput | ApplicationUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type LeaseUpdateManyWithoutTenantNestedInput = {
    create?: XOR<LeaseCreateWithoutTenantInput, LeaseUncheckedCreateWithoutTenantInput> | LeaseCreateWithoutTenantInput[] | LeaseUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutTenantInput | LeaseCreateOrConnectWithoutTenantInput[]
    upsert?: LeaseUpsertWithWhereUniqueWithoutTenantInput | LeaseUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: LeaseCreateManyTenantInputEnvelope
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    update?: LeaseUpdateWithWhereUniqueWithoutTenantInput | LeaseUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: LeaseUpdateManyWithWhereWithoutTenantInput | LeaseUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ReviewCreateWithoutTenantInput, ReviewUncheckedCreateWithoutTenantInput> | ReviewCreateWithoutTenantInput[] | ReviewUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTenantInput | ReviewCreateOrConnectWithoutTenantInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTenantInput | ReviewUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ReviewCreateManyTenantInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTenantInput | ReviewUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTenantInput | ReviewUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PropertyUncheckedUpdateManyWithoutTenantsNestedInput = {
    create?: XOR<PropertyCreateWithoutTenantsInput, PropertyUncheckedCreateWithoutTenantsInput> | PropertyCreateWithoutTenantsInput[] | PropertyUncheckedCreateWithoutTenantsInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutTenantsInput | PropertyCreateOrConnectWithoutTenantsInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutTenantsInput | PropertyUpsertWithWhereUniqueWithoutTenantsInput[]
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutTenantsInput | PropertyUpdateWithWhereUniqueWithoutTenantsInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutTenantsInput | PropertyUpdateManyWithWhereWithoutTenantsInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput = {
    create?: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput> | PropertyCreateWithoutFavoritedByInput[] | PropertyUncheckedCreateWithoutFavoritedByInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutFavoritedByInput | PropertyCreateOrConnectWithoutFavoritedByInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutFavoritedByInput | PropertyUpsertWithWhereUniqueWithoutFavoritedByInput[]
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutFavoritedByInput | PropertyUpdateWithWhereUniqueWithoutFavoritedByInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutFavoritedByInput | PropertyUpdateManyWithWhereWithoutFavoritedByInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ApplicationCreateWithoutTenantInput, ApplicationUncheckedCreateWithoutTenantInput> | ApplicationCreateWithoutTenantInput[] | ApplicationUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutTenantInput | ApplicationCreateOrConnectWithoutTenantInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutTenantInput | ApplicationUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ApplicationCreateManyTenantInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutTenantInput | ApplicationUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutTenantInput | ApplicationUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type LeaseUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<LeaseCreateWithoutTenantInput, LeaseUncheckedCreateWithoutTenantInput> | LeaseCreateWithoutTenantInput[] | LeaseUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutTenantInput | LeaseCreateOrConnectWithoutTenantInput[]
    upsert?: LeaseUpsertWithWhereUniqueWithoutTenantInput | LeaseUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: LeaseCreateManyTenantInputEnvelope
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    update?: LeaseUpdateWithWhereUniqueWithoutTenantInput | LeaseUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: LeaseUpdateManyWithWhereWithoutTenantInput | LeaseUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutTenantNestedInput = {
    create?: XOR<ReviewCreateWithoutTenantInput, ReviewUncheckedCreateWithoutTenantInput> | ReviewCreateWithoutTenantInput[] | ReviewUncheckedCreateWithoutTenantInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutTenantInput | ReviewCreateOrConnectWithoutTenantInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutTenantInput | ReviewUpsertWithWhereUniqueWithoutTenantInput[]
    createMany?: ReviewCreateManyTenantInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutTenantInput | ReviewUpdateWithWhereUniqueWithoutTenantInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutTenantInput | ReviewUpdateManyWithWhereWithoutTenantInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PropertyCreatephotoUrlsInput = {
    set: string[]
  }

  export type PropertyCreateamenitiesInput = {
    set: $Enums.Amenity[]
  }

  export type PropertyCreatehighlightsInput = {
    set: $Enums.Highlight[]
  }

  export type LocationCreateNestedOneWithoutPropertiesInput = {
    connect?: LocationWhereUniqueInput
  }

  export type LandlordCreateNestedOneWithoutPropertiesInput = {
    create?: XOR<LandlordCreateWithoutPropertiesInput, LandlordUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: LandlordCreateOrConnectWithoutPropertiesInput
    connect?: LandlordWhereUniqueInput
  }

  export type LeaseCreateNestedManyWithoutPropertyInput = {
    create?: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput> | LeaseCreateWithoutPropertyInput[] | LeaseUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[]
    createMany?: LeaseCreateManyPropertyInputEnvelope
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
  }

  export type ApplicationCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput> | ApplicationCreateWithoutPropertyInput[] | ApplicationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[]
    createMany?: ApplicationCreateManyPropertyInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type TenantCreateNestedManyWithoutFavoritesInput = {
    create?: XOR<TenantCreateWithoutFavoritesInput, TenantUncheckedCreateWithoutFavoritesInput> | TenantCreateWithoutFavoritesInput[] | TenantUncheckedCreateWithoutFavoritesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutFavoritesInput | TenantCreateOrConnectWithoutFavoritesInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
  }

  export type TenantCreateNestedManyWithoutPropertiesInput = {
    create?: XOR<TenantCreateWithoutPropertiesInput, TenantUncheckedCreateWithoutPropertiesInput> | TenantCreateWithoutPropertiesInput[] | TenantUncheckedCreateWithoutPropertiesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPropertiesInput | TenantCreateOrConnectWithoutPropertiesInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
  }

  export type LeaseUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput> | LeaseCreateWithoutPropertyInput[] | LeaseUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[]
    createMany?: LeaseCreateManyPropertyInputEnvelope
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedManyWithoutPropertyInput = {
    create?: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput> | ApplicationCreateWithoutPropertyInput[] | ApplicationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[]
    createMany?: ApplicationCreateManyPropertyInputEnvelope
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
  }

  export type TenantUncheckedCreateNestedManyWithoutFavoritesInput = {
    create?: XOR<TenantCreateWithoutFavoritesInput, TenantUncheckedCreateWithoutFavoritesInput> | TenantCreateWithoutFavoritesInput[] | TenantUncheckedCreateWithoutFavoritesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutFavoritesInput | TenantCreateOrConnectWithoutFavoritesInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
  }

  export type TenantUncheckedCreateNestedManyWithoutPropertiesInput = {
    create?: XOR<TenantCreateWithoutPropertiesInput, TenantUncheckedCreateWithoutPropertiesInput> | TenantCreateWithoutPropertiesInput[] | TenantUncheckedCreateWithoutPropertiesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPropertiesInput | TenantCreateOrConnectWithoutPropertiesInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PropertyUpdatephotoUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PropertyUpdateamenitiesInput = {
    set?: $Enums.Amenity[]
    push?: $Enums.Amenity | $Enums.Amenity[]
  }

  export type PropertyUpdatehighlightsInput = {
    set?: $Enums.Highlight[]
    push?: $Enums.Highlight | $Enums.Highlight[]
  }

  export type NullableEnumGenderPreferenceFieldUpdateOperationsInput = {
    set?: $Enums.GenderPreference | null
  }

  export type EnumPropertyTypeFieldUpdateOperationsInput = {
    set?: $Enums.PropertyType
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUpdateOneRequiredWithoutPropertiesNestedInput = {
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutPropertiesInput, LocationUpdateWithoutPropertiesInput>, LocationUncheckedUpdateWithoutPropertiesInput>
  }

  export type LandlordUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: XOR<LandlordCreateWithoutPropertiesInput, LandlordUncheckedCreateWithoutPropertiesInput>
    connectOrCreate?: LandlordCreateOrConnectWithoutPropertiesInput
    upsert?: LandlordUpsertWithoutPropertiesInput
    connect?: LandlordWhereUniqueInput
    update?: XOR<XOR<LandlordUpdateToOneWithWhereWithoutPropertiesInput, LandlordUpdateWithoutPropertiesInput>, LandlordUncheckedUpdateWithoutPropertiesInput>
  }

  export type LeaseUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput> | LeaseCreateWithoutPropertyInput[] | LeaseUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[]
    upsert?: LeaseUpsertWithWhereUniqueWithoutPropertyInput | LeaseUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: LeaseCreateManyPropertyInputEnvelope
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    update?: LeaseUpdateWithWhereUniqueWithoutPropertyInput | LeaseUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: LeaseUpdateManyWithWhereWithoutPropertyInput | LeaseUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[]
  }

  export type ApplicationUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput> | ApplicationCreateWithoutPropertyInput[] | ApplicationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutPropertyInput | ApplicationUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ApplicationCreateManyPropertyInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutPropertyInput | ApplicationUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutPropertyInput | ApplicationUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type TenantUpdateManyWithoutFavoritesNestedInput = {
    create?: XOR<TenantCreateWithoutFavoritesInput, TenantUncheckedCreateWithoutFavoritesInput> | TenantCreateWithoutFavoritesInput[] | TenantUncheckedCreateWithoutFavoritesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutFavoritesInput | TenantCreateOrConnectWithoutFavoritesInput[]
    upsert?: TenantUpsertWithWhereUniqueWithoutFavoritesInput | TenantUpsertWithWhereUniqueWithoutFavoritesInput[]
    set?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    disconnect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    delete?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    update?: TenantUpdateWithWhereUniqueWithoutFavoritesInput | TenantUpdateWithWhereUniqueWithoutFavoritesInput[]
    updateMany?: TenantUpdateManyWithWhereWithoutFavoritesInput | TenantUpdateManyWithWhereWithoutFavoritesInput[]
    deleteMany?: TenantScalarWhereInput | TenantScalarWhereInput[]
  }

  export type TenantUpdateManyWithoutPropertiesNestedInput = {
    create?: XOR<TenantCreateWithoutPropertiesInput, TenantUncheckedCreateWithoutPropertiesInput> | TenantCreateWithoutPropertiesInput[] | TenantUncheckedCreateWithoutPropertiesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPropertiesInput | TenantCreateOrConnectWithoutPropertiesInput[]
    upsert?: TenantUpsertWithWhereUniqueWithoutPropertiesInput | TenantUpsertWithWhereUniqueWithoutPropertiesInput[]
    set?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    disconnect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    delete?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    update?: TenantUpdateWithWhereUniqueWithoutPropertiesInput | TenantUpdateWithWhereUniqueWithoutPropertiesInput[]
    updateMany?: TenantUpdateManyWithWhereWithoutPropertiesInput | TenantUpdateManyWithWhereWithoutPropertiesInput[]
    deleteMany?: TenantScalarWhereInput | TenantScalarWhereInput[]
  }

  export type LeaseUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput> | LeaseCreateWithoutPropertyInput[] | LeaseUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: LeaseCreateOrConnectWithoutPropertyInput | LeaseCreateOrConnectWithoutPropertyInput[]
    upsert?: LeaseUpsertWithWhereUniqueWithoutPropertyInput | LeaseUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: LeaseCreateManyPropertyInputEnvelope
    set?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    disconnect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    delete?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    connect?: LeaseWhereUniqueInput | LeaseWhereUniqueInput[]
    update?: LeaseUpdateWithWhereUniqueWithoutPropertyInput | LeaseUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: LeaseUpdateManyWithWhereWithoutPropertyInput | LeaseUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: LeaseScalarWhereInput | LeaseScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateManyWithoutPropertyNestedInput = {
    create?: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput> | ApplicationCreateWithoutPropertyInput[] | ApplicationUncheckedCreateWithoutPropertyInput[]
    connectOrCreate?: ApplicationCreateOrConnectWithoutPropertyInput | ApplicationCreateOrConnectWithoutPropertyInput[]
    upsert?: ApplicationUpsertWithWhereUniqueWithoutPropertyInput | ApplicationUpsertWithWhereUniqueWithoutPropertyInput[]
    createMany?: ApplicationCreateManyPropertyInputEnvelope
    set?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    disconnect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    delete?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    connect?: ApplicationWhereUniqueInput | ApplicationWhereUniqueInput[]
    update?: ApplicationUpdateWithWhereUniqueWithoutPropertyInput | ApplicationUpdateWithWhereUniqueWithoutPropertyInput[]
    updateMany?: ApplicationUpdateManyWithWhereWithoutPropertyInput | ApplicationUpdateManyWithWhereWithoutPropertyInput[]
    deleteMany?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
  }

  export type TenantUncheckedUpdateManyWithoutFavoritesNestedInput = {
    create?: XOR<TenantCreateWithoutFavoritesInput, TenantUncheckedCreateWithoutFavoritesInput> | TenantCreateWithoutFavoritesInput[] | TenantUncheckedCreateWithoutFavoritesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutFavoritesInput | TenantCreateOrConnectWithoutFavoritesInput[]
    upsert?: TenantUpsertWithWhereUniqueWithoutFavoritesInput | TenantUpsertWithWhereUniqueWithoutFavoritesInput[]
    set?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    disconnect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    delete?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    update?: TenantUpdateWithWhereUniqueWithoutFavoritesInput | TenantUpdateWithWhereUniqueWithoutFavoritesInput[]
    updateMany?: TenantUpdateManyWithWhereWithoutFavoritesInput | TenantUpdateManyWithWhereWithoutFavoritesInput[]
    deleteMany?: TenantScalarWhereInput | TenantScalarWhereInput[]
  }

  export type TenantUncheckedUpdateManyWithoutPropertiesNestedInput = {
    create?: XOR<TenantCreateWithoutPropertiesInput, TenantUncheckedCreateWithoutPropertiesInput> | TenantCreateWithoutPropertiesInput[] | TenantUncheckedCreateWithoutPropertiesInput[]
    connectOrCreate?: TenantCreateOrConnectWithoutPropertiesInput | TenantCreateOrConnectWithoutPropertiesInput[]
    upsert?: TenantUpsertWithWhereUniqueWithoutPropertiesInput | TenantUpsertWithWhereUniqueWithoutPropertiesInput[]
    set?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    disconnect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    delete?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    connect?: TenantWhereUniqueInput | TenantWhereUniqueInput[]
    update?: TenantUpdateWithWhereUniqueWithoutPropertiesInput | TenantUpdateWithWhereUniqueWithoutPropertiesInput[]
    updateMany?: TenantUpdateManyWithWhereWithoutPropertiesInput | TenantUpdateManyWithWhereWithoutPropertiesInput[]
    deleteMany?: TenantScalarWhereInput | TenantScalarWhereInput[]
  }

  export type PropertyUpdateManyWithoutLocationNestedInput = {
    create?: XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput> | PropertyCreateWithoutLocationInput[] | PropertyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutLocationInput | PropertyCreateOrConnectWithoutLocationInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutLocationInput | PropertyUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: PropertyCreateManyLocationInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutLocationInput | PropertyUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutLocationInput | PropertyUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type SafetyIndicatorUpdateManyWithoutLocationNestedInput = {
    create?: XOR<SafetyIndicatorCreateWithoutLocationInput, SafetyIndicatorUncheckedCreateWithoutLocationInput> | SafetyIndicatorCreateWithoutLocationInput[] | SafetyIndicatorUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: SafetyIndicatorCreateOrConnectWithoutLocationInput | SafetyIndicatorCreateOrConnectWithoutLocationInput[]
    upsert?: SafetyIndicatorUpsertWithWhereUniqueWithoutLocationInput | SafetyIndicatorUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: SafetyIndicatorCreateManyLocationInputEnvelope
    set?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    disconnect?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    delete?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    connect?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    update?: SafetyIndicatorUpdateWithWhereUniqueWithoutLocationInput | SafetyIndicatorUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: SafetyIndicatorUpdateManyWithWhereWithoutLocationInput | SafetyIndicatorUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: SafetyIndicatorScalarWhereInput | SafetyIndicatorScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutLocationNestedInput = {
    create?: XOR<ReviewCreateWithoutLocationInput, ReviewUncheckedCreateWithoutLocationInput> | ReviewCreateWithoutLocationInput[] | ReviewUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutLocationInput | ReviewCreateOrConnectWithoutLocationInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutLocationInput | ReviewUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: ReviewCreateManyLocationInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutLocationInput | ReviewUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutLocationInput | ReviewUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PropertyUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput> | PropertyCreateWithoutLocationInput[] | PropertyUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: PropertyCreateOrConnectWithoutLocationInput | PropertyCreateOrConnectWithoutLocationInput[]
    upsert?: PropertyUpsertWithWhereUniqueWithoutLocationInput | PropertyUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: PropertyCreateManyLocationInputEnvelope
    set?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    disconnect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    delete?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    connect?: PropertyWhereUniqueInput | PropertyWhereUniqueInput[]
    update?: PropertyUpdateWithWhereUniqueWithoutLocationInput | PropertyUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: PropertyUpdateManyWithWhereWithoutLocationInput | PropertyUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
  }

  export type SafetyIndicatorUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<SafetyIndicatorCreateWithoutLocationInput, SafetyIndicatorUncheckedCreateWithoutLocationInput> | SafetyIndicatorCreateWithoutLocationInput[] | SafetyIndicatorUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: SafetyIndicatorCreateOrConnectWithoutLocationInput | SafetyIndicatorCreateOrConnectWithoutLocationInput[]
    upsert?: SafetyIndicatorUpsertWithWhereUniqueWithoutLocationInput | SafetyIndicatorUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: SafetyIndicatorCreateManyLocationInputEnvelope
    set?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    disconnect?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    delete?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    connect?: SafetyIndicatorWhereUniqueInput | SafetyIndicatorWhereUniqueInput[]
    update?: SafetyIndicatorUpdateWithWhereUniqueWithoutLocationInput | SafetyIndicatorUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: SafetyIndicatorUpdateManyWithWhereWithoutLocationInput | SafetyIndicatorUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: SafetyIndicatorScalarWhereInput | SafetyIndicatorScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<ReviewCreateWithoutLocationInput, ReviewUncheckedCreateWithoutLocationInput> | ReviewCreateWithoutLocationInput[] | ReviewUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutLocationInput | ReviewCreateOrConnectWithoutLocationInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutLocationInput | ReviewUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: ReviewCreateManyLocationInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutLocationInput | ReviewUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutLocationInput | ReviewUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type PropertyCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutApplicationsInput
    connect?: PropertyWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<TenantCreateWithoutApplicationsInput, TenantUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutApplicationsInput
    connect?: TenantWhereUniqueInput
  }

  export type LeaseCreateNestedOneWithoutApplicationInput = {
    create?: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: LeaseCreateOrConnectWithoutApplicationInput
    connect?: LeaseWhereUniqueInput
  }

  export type EnumApplicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ApplicationStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PropertyUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutApplicationsInput
    upsert?: PropertyUpsertWithoutApplicationsInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutApplicationsInput, PropertyUpdateWithoutApplicationsInput>, PropertyUncheckedUpdateWithoutApplicationsInput>
  }

  export type TenantUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<TenantCreateWithoutApplicationsInput, TenantUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutApplicationsInput
    upsert?: TenantUpsertWithoutApplicationsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutApplicationsInput, TenantUpdateWithoutApplicationsInput>, TenantUncheckedUpdateWithoutApplicationsInput>
  }

  export type LeaseUpdateOneWithoutApplicationNestedInput = {
    create?: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>
    connectOrCreate?: LeaseCreateOrConnectWithoutApplicationInput
    upsert?: LeaseUpsertWithoutApplicationInput
    disconnect?: LeaseWhereInput | boolean
    delete?: LeaseWhereInput | boolean
    connect?: LeaseWhereUniqueInput
    update?: XOR<XOR<LeaseUpdateToOneWithWhereWithoutApplicationInput, LeaseUpdateWithoutApplicationInput>, LeaseUncheckedUpdateWithoutApplicationInput>
  }

  export type PropertyCreateNestedOneWithoutLeasesInput = {
    create?: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutLeasesInput
    connect?: PropertyWhereUniqueInput
  }

  export type TenantCreateNestedOneWithoutLeasesInput = {
    create?: XOR<TenantCreateWithoutLeasesInput, TenantUncheckedCreateWithoutLeasesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutLeasesInput
    connect?: TenantWhereUniqueInput
  }

  export type ApplicationCreateNestedOneWithoutLeaseInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput
    connect?: ApplicationWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutLeaseInput = {
    create?: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput> | PaymentCreateWithoutLeaseInput[] | PaymentUncheckedCreateWithoutLeaseInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[]
    createMany?: PaymentCreateManyLeaseInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type ApplicationUncheckedCreateNestedOneWithoutLeaseInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput
    connect?: ApplicationWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedManyWithoutLeaseInput = {
    create?: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput> | PaymentCreateWithoutLeaseInput[] | PaymentUncheckedCreateWithoutLeaseInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[]
    createMany?: PaymentCreateManyLeaseInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PropertyUpdateOneRequiredWithoutLeasesNestedInput = {
    create?: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>
    connectOrCreate?: PropertyCreateOrConnectWithoutLeasesInput
    upsert?: PropertyUpsertWithoutLeasesInput
    connect?: PropertyWhereUniqueInput
    update?: XOR<XOR<PropertyUpdateToOneWithWhereWithoutLeasesInput, PropertyUpdateWithoutLeasesInput>, PropertyUncheckedUpdateWithoutLeasesInput>
  }

  export type TenantUpdateOneRequiredWithoutLeasesNestedInput = {
    create?: XOR<TenantCreateWithoutLeasesInput, TenantUncheckedCreateWithoutLeasesInput>
    connectOrCreate?: TenantCreateOrConnectWithoutLeasesInput
    upsert?: TenantUpsertWithoutLeasesInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutLeasesInput, TenantUpdateWithoutLeasesInput>, TenantUncheckedUpdateWithoutLeasesInput>
  }

  export type ApplicationUpdateOneWithoutLeaseNestedInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput
    upsert?: ApplicationUpsertWithoutLeaseInput
    disconnect?: ApplicationWhereInput | boolean
    delete?: ApplicationWhereInput | boolean
    connect?: ApplicationWhereUniqueInput
    update?: XOR<XOR<ApplicationUpdateToOneWithWhereWithoutLeaseInput, ApplicationUpdateWithoutLeaseInput>, ApplicationUncheckedUpdateWithoutLeaseInput>
  }

  export type PaymentUpdateManyWithoutLeaseNestedInput = {
    create?: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput> | PaymentCreateWithoutLeaseInput[] | PaymentUncheckedCreateWithoutLeaseInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutLeaseInput | PaymentUpsertWithWhereUniqueWithoutLeaseInput[]
    createMany?: PaymentCreateManyLeaseInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutLeaseInput | PaymentUpdateWithWhereUniqueWithoutLeaseInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutLeaseInput | PaymentUpdateManyWithWhereWithoutLeaseInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type ApplicationUncheckedUpdateOneWithoutLeaseNestedInput = {
    create?: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>
    connectOrCreate?: ApplicationCreateOrConnectWithoutLeaseInput
    upsert?: ApplicationUpsertWithoutLeaseInput
    disconnect?: ApplicationWhereInput | boolean
    delete?: ApplicationWhereInput | boolean
    connect?: ApplicationWhereUniqueInput
    update?: XOR<XOR<ApplicationUpdateToOneWithWhereWithoutLeaseInput, ApplicationUpdateWithoutLeaseInput>, ApplicationUncheckedUpdateWithoutLeaseInput>
  }

  export type PaymentUncheckedUpdateManyWithoutLeaseNestedInput = {
    create?: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput> | PaymentCreateWithoutLeaseInput[] | PaymentUncheckedCreateWithoutLeaseInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutLeaseInput | PaymentCreateOrConnectWithoutLeaseInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutLeaseInput | PaymentUpsertWithWhereUniqueWithoutLeaseInput[]
    createMany?: PaymentCreateManyLeaseInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutLeaseInput | PaymentUpdateWithWhereUniqueWithoutLeaseInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutLeaseInput | PaymentUpdateManyWithWhereWithoutLeaseInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type LeaseCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: LeaseCreateOrConnectWithoutPaymentsInput
    connect?: LeaseWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type LeaseUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: LeaseCreateOrConnectWithoutPaymentsInput
    upsert?: LeaseUpsertWithoutPaymentsInput
    connect?: LeaseWhereUniqueInput
    update?: XOR<XOR<LeaseUpdateToOneWithWhereWithoutPaymentsInput, LeaseUpdateWithoutPaymentsInput>, LeaseUncheckedUpdateWithoutPaymentsInput>
  }

  export type TenantCreateNestedOneWithoutReviewsInput = {
    create?: XOR<TenantCreateWithoutReviewsInput, TenantUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutReviewsInput
    connect?: TenantWhereUniqueInput
  }

  export type LandlordCreateNestedOneWithoutReviewsInput = {
    create?: XOR<LandlordCreateWithoutReviewsInput, LandlordUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: LandlordCreateOrConnectWithoutReviewsInput
    connect?: LandlordWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutReviewsInput = {
    connect?: LocationWhereUniqueInput
  }

  export type TenantUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<TenantCreateWithoutReviewsInput, TenantUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: TenantCreateOrConnectWithoutReviewsInput
    upsert?: TenantUpsertWithoutReviewsInput
    connect?: TenantWhereUniqueInput
    update?: XOR<XOR<TenantUpdateToOneWithWhereWithoutReviewsInput, TenantUpdateWithoutReviewsInput>, TenantUncheckedUpdateWithoutReviewsInput>
  }

  export type LandlordUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<LandlordCreateWithoutReviewsInput, LandlordUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: LandlordCreateOrConnectWithoutReviewsInput
    upsert?: LandlordUpsertWithoutReviewsInput
    connect?: LandlordWhereUniqueInput
    update?: XOR<XOR<LandlordUpdateToOneWithWhereWithoutReviewsInput, LandlordUpdateWithoutReviewsInput>, LandlordUncheckedUpdateWithoutReviewsInput>
  }

  export type LocationUpdateOneRequiredWithoutReviewsNestedInput = {
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutReviewsInput, LocationUpdateWithoutReviewsInput>, LocationUncheckedUpdateWithoutReviewsInput>
  }

  export type LocationCreateNestedOneWithoutSafetyIndicatorsInput = {
    connect?: LocationWhereUniqueInput
  }

  export type EnumSafetyLevelFieldUpdateOperationsInput = {
    set?: $Enums.SafetyLevel
  }

  export type LocationUpdateOneRequiredWithoutSafetyIndicatorsNestedInput = {
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutSafetyIndicatorsInput, LocationUpdateWithoutSafetyIndicatorsInput>, LocationUncheckedUpdateWithoutSafetyIndicatorsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumGenderPreferenceNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderPreference | EnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderPreferenceNullableFilter<$PrismaModel> | $Enums.GenderPreference | null
  }

  export type NestedEnumPropertyTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeFilter<$PrismaModel> | $Enums.PropertyType
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumGenderPreferenceNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderPreference | EnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    in?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.GenderPreference[] | ListEnumGenderPreferenceFieldRefInput<$PrismaModel> | null
    not?: NestedEnumGenderPreferenceNullableWithAggregatesFilter<$PrismaModel> | $Enums.GenderPreference | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumGenderPreferenceNullableFilter<$PrismaModel>
    _max?: NestedEnumGenderPreferenceNullableFilter<$PrismaModel>
  }

  export type NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PropertyType | EnumPropertyTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PropertyType[] | ListEnumPropertyTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPropertyTypeWithAggregatesFilter<$PrismaModel> | $Enums.PropertyType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPropertyTypeFilter<$PrismaModel>
    _max?: NestedEnumPropertyTypeFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumApplicationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusFilter<$PrismaModel> | $Enums.ApplicationStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ApplicationStatus | EnumApplicationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ApplicationStatus[] | ListEnumApplicationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumApplicationStatusWithAggregatesFilter<$PrismaModel> | $Enums.ApplicationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumApplicationStatusFilter<$PrismaModel>
    _max?: NestedEnumApplicationStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type NestedEnumSafetyLevelFilter<$PrismaModel = never> = {
    equals?: $Enums.SafetyLevel | EnumSafetyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSafetyLevelFilter<$PrismaModel> | $Enums.SafetyLevel
  }

  export type NestedEnumSafetyLevelWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SafetyLevel | EnumSafetyLevelFieldRefInput<$PrismaModel>
    in?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    notIn?: $Enums.SafetyLevel[] | ListEnumSafetyLevelFieldRefInput<$PrismaModel>
    not?: NestedEnumSafetyLevelWithAggregatesFilter<$PrismaModel> | $Enums.SafetyLevel
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSafetyLevelFilter<$PrismaModel>
    _max?: NestedEnumSafetyLevelFilter<$PrismaModel>
  }

  export type PropertyCreateWithoutLandlordInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    location: LocationCreateNestedOneWithoutPropertiesInput
    leases?: LeaseCreateNestedManyWithoutPropertyInput
    applications?: ApplicationCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantCreateNestedManyWithoutFavoritesInput
    tenants?: TenantCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateWithoutLandlordInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantUncheckedCreateNestedManyWithoutFavoritesInput
    tenants?: TenantUncheckedCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyCreateOrConnectWithoutLandlordInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutLandlordInput, PropertyUncheckedCreateWithoutLandlordInput>
  }

  export type PropertyCreateManyLandlordInputEnvelope = {
    data: PropertyCreateManyLandlordInput | PropertyCreateManyLandlordInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutLandlordInput = {
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutReviewsInput
    location: LocationCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutLandlordInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenantId: number
    locationId: number
  }

  export type ReviewCreateOrConnectWithoutLandlordInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutLandlordInput, ReviewUncheckedCreateWithoutLandlordInput>
  }

  export type ReviewCreateManyLandlordInputEnvelope = {
    data: ReviewCreateManyLandlordInput | ReviewCreateManyLandlordInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithWhereUniqueWithoutLandlordInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutLandlordInput, PropertyUncheckedUpdateWithoutLandlordInput>
    create: XOR<PropertyCreateWithoutLandlordInput, PropertyUncheckedCreateWithoutLandlordInput>
  }

  export type PropertyUpdateWithWhereUniqueWithoutLandlordInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutLandlordInput, PropertyUncheckedUpdateWithoutLandlordInput>
  }

  export type PropertyUpdateManyWithWhereWithoutLandlordInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutLandlordInput>
  }

  export type PropertyScalarWhereInput = {
    AND?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    OR?: PropertyScalarWhereInput[]
    NOT?: PropertyScalarWhereInput | PropertyScalarWhereInput[]
    id?: IntFilter<"Property"> | number
    name?: StringFilter<"Property"> | string
    description?: StringFilter<"Property"> | string
    pricePerMonth?: FloatFilter<"Property"> | number
    securityDeposit?: FloatFilter<"Property"> | number
    applicationFee?: FloatFilter<"Property"> | number
    photoUrls?: StringNullableListFilter<"Property">
    amenities?: EnumAmenityNullableListFilter<"Property">
    highlights?: EnumHighlightNullableListFilter<"Property">
    isPetsAllowed?: BoolFilter<"Property"> | boolean
    isParkingIncluded?: BoolFilter<"Property"> | boolean
    isBachelorFriendly?: BoolFilter<"Property"> | boolean
    isFemaleOnly?: BoolFilter<"Property"> | boolean
    genderPreference?: EnumGenderPreferenceNullableFilter<"Property"> | $Enums.GenderPreference | null
    beds?: IntFilter<"Property"> | number
    baths?: FloatFilter<"Property"> | number
    squareFeet?: IntFilter<"Property"> | number
    propertyType?: EnumPropertyTypeFilter<"Property"> | $Enums.PropertyType
    postedDate?: DateTimeFilter<"Property"> | Date | string
    averageRating?: FloatNullableFilter<"Property"> | number | null
    numberOfReviews?: IntNullableFilter<"Property"> | number | null
    locationId?: IntFilter<"Property"> | number
    landlordCognitoId?: StringFilter<"Property"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutLandlordInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutLandlordInput, ReviewUncheckedUpdateWithoutLandlordInput>
    create: XOR<ReviewCreateWithoutLandlordInput, ReviewUncheckedCreateWithoutLandlordInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutLandlordInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutLandlordInput, ReviewUncheckedUpdateWithoutLandlordInput>
  }

  export type ReviewUpdateManyWithWhereWithoutLandlordInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutLandlordInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    comment?: StringNullableFilter<"Review"> | string | null
    createdAt?: DateTimeFilter<"Review"> | Date | string
    tenantId?: IntFilter<"Review"> | number
    landlordId?: IntFilter<"Review"> | number
    locationId?: IntFilter<"Review"> | number
  }

  export type PropertyCreateWithoutTenantsInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    location: LocationCreateNestedOneWithoutPropertiesInput
    landlord: LandlordCreateNestedOneWithoutPropertiesInput
    leases?: LeaseCreateNestedManyWithoutPropertyInput
    applications?: ApplicationCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantCreateNestedManyWithoutFavoritesInput
  }

  export type PropertyUncheckedCreateWithoutTenantsInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    landlordCognitoId: string
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantUncheckedCreateNestedManyWithoutFavoritesInput
  }

  export type PropertyCreateOrConnectWithoutTenantsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutTenantsInput, PropertyUncheckedCreateWithoutTenantsInput>
  }

  export type PropertyCreateWithoutFavoritedByInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    location: LocationCreateNestedOneWithoutPropertiesInput
    landlord: LandlordCreateNestedOneWithoutPropertiesInput
    leases?: LeaseCreateNestedManyWithoutPropertyInput
    applications?: ApplicationCreateNestedManyWithoutPropertyInput
    tenants?: TenantCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateWithoutFavoritedByInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    landlordCognitoId: string
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput
    tenants?: TenantUncheckedCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyCreateOrConnectWithoutFavoritedByInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>
  }

  export type ApplicationCreateWithoutTenantInput = {
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    property: PropertyCreateNestedOneWithoutApplicationsInput
    lease?: LeaseCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutTenantInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    propertyId: number
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    leaseId?: number | null
  }

  export type ApplicationCreateOrConnectWithoutTenantInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutTenantInput, ApplicationUncheckedCreateWithoutTenantInput>
  }

  export type ApplicationCreateManyTenantInputEnvelope = {
    data: ApplicationCreateManyTenantInput | ApplicationCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type LeaseCreateWithoutTenantInput = {
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    property: PropertyCreateNestedOneWithoutLeasesInput
    application?: ApplicationCreateNestedOneWithoutLeaseInput
    payments?: PaymentCreateNestedManyWithoutLeaseInput
  }

  export type LeaseUncheckedCreateWithoutTenantInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    propertyId: number
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput
  }

  export type LeaseCreateOrConnectWithoutTenantInput = {
    where: LeaseWhereUniqueInput
    create: XOR<LeaseCreateWithoutTenantInput, LeaseUncheckedCreateWithoutTenantInput>
  }

  export type LeaseCreateManyTenantInputEnvelope = {
    data: LeaseCreateManyTenantInput | LeaseCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutTenantInput = {
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    landlord: LandlordCreateNestedOneWithoutReviewsInput
    location: LocationCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutTenantInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    landlordId: number
    locationId: number
  }

  export type ReviewCreateOrConnectWithoutTenantInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutTenantInput, ReviewUncheckedCreateWithoutTenantInput>
  }

  export type ReviewCreateManyTenantInputEnvelope = {
    data: ReviewCreateManyTenantInput | ReviewCreateManyTenantInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithWhereUniqueWithoutTenantsInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutTenantsInput, PropertyUncheckedUpdateWithoutTenantsInput>
    create: XOR<PropertyCreateWithoutTenantsInput, PropertyUncheckedCreateWithoutTenantsInput>
  }

  export type PropertyUpdateWithWhereUniqueWithoutTenantsInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutTenantsInput, PropertyUncheckedUpdateWithoutTenantsInput>
  }

  export type PropertyUpdateManyWithWhereWithoutTenantsInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutTenantsInput>
  }

  export type PropertyUpsertWithWhereUniqueWithoutFavoritedByInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutFavoritedByInput, PropertyUncheckedUpdateWithoutFavoritedByInput>
    create: XOR<PropertyCreateWithoutFavoritedByInput, PropertyUncheckedCreateWithoutFavoritedByInput>
  }

  export type PropertyUpdateWithWhereUniqueWithoutFavoritedByInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutFavoritedByInput, PropertyUncheckedUpdateWithoutFavoritedByInput>
  }

  export type PropertyUpdateManyWithWhereWithoutFavoritedByInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutFavoritedByInput>
  }

  export type ApplicationUpsertWithWhereUniqueWithoutTenantInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutTenantInput, ApplicationUncheckedUpdateWithoutTenantInput>
    create: XOR<ApplicationCreateWithoutTenantInput, ApplicationUncheckedCreateWithoutTenantInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutTenantInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutTenantInput, ApplicationUncheckedUpdateWithoutTenantInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutTenantInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutTenantInput>
  }

  export type ApplicationScalarWhereInput = {
    AND?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    OR?: ApplicationScalarWhereInput[]
    NOT?: ApplicationScalarWhereInput | ApplicationScalarWhereInput[]
    id?: IntFilter<"Application"> | number
    applicationDate?: DateTimeFilter<"Application"> | Date | string
    status?: EnumApplicationStatusFilter<"Application"> | $Enums.ApplicationStatus
    propertyId?: IntFilter<"Application"> | number
    tenantCognitoId?: StringFilter<"Application"> | string
    name?: StringFilter<"Application"> | string
    email?: StringFilter<"Application"> | string
    phoneNumber?: StringFilter<"Application"> | string
    message?: StringNullableFilter<"Application"> | string | null
    leaseId?: IntNullableFilter<"Application"> | number | null
  }

  export type LeaseUpsertWithWhereUniqueWithoutTenantInput = {
    where: LeaseWhereUniqueInput
    update: XOR<LeaseUpdateWithoutTenantInput, LeaseUncheckedUpdateWithoutTenantInput>
    create: XOR<LeaseCreateWithoutTenantInput, LeaseUncheckedCreateWithoutTenantInput>
  }

  export type LeaseUpdateWithWhereUniqueWithoutTenantInput = {
    where: LeaseWhereUniqueInput
    data: XOR<LeaseUpdateWithoutTenantInput, LeaseUncheckedUpdateWithoutTenantInput>
  }

  export type LeaseUpdateManyWithWhereWithoutTenantInput = {
    where: LeaseScalarWhereInput
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyWithoutTenantInput>
  }

  export type LeaseScalarWhereInput = {
    AND?: LeaseScalarWhereInput | LeaseScalarWhereInput[]
    OR?: LeaseScalarWhereInput[]
    NOT?: LeaseScalarWhereInput | LeaseScalarWhereInput[]
    id?: IntFilter<"Lease"> | number
    startDate?: DateTimeFilter<"Lease"> | Date | string
    endDate?: DateTimeFilter<"Lease"> | Date | string
    rent?: FloatFilter<"Lease"> | number
    deposit?: FloatFilter<"Lease"> | number
    propertyId?: IntFilter<"Lease"> | number
    tenantCognitoId?: StringFilter<"Lease"> | string
  }

  export type ReviewUpsertWithWhereUniqueWithoutTenantInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutTenantInput, ReviewUncheckedUpdateWithoutTenantInput>
    create: XOR<ReviewCreateWithoutTenantInput, ReviewUncheckedCreateWithoutTenantInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutTenantInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutTenantInput, ReviewUncheckedUpdateWithoutTenantInput>
  }

  export type ReviewUpdateManyWithWhereWithoutTenantInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutTenantInput>
  }

  export type LandlordCreateWithoutPropertiesInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    reviews?: ReviewCreateNestedManyWithoutLandlordInput
  }

  export type LandlordUncheckedCreateWithoutPropertiesInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutLandlordInput
  }

  export type LandlordCreateOrConnectWithoutPropertiesInput = {
    where: LandlordWhereUniqueInput
    create: XOR<LandlordCreateWithoutPropertiesInput, LandlordUncheckedCreateWithoutPropertiesInput>
  }

  export type LeaseCreateWithoutPropertyInput = {
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    tenant: TenantCreateNestedOneWithoutLeasesInput
    application?: ApplicationCreateNestedOneWithoutLeaseInput
    payments?: PaymentCreateNestedManyWithoutLeaseInput
  }

  export type LeaseUncheckedCreateWithoutPropertyInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    tenantCognitoId: string
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput
  }

  export type LeaseCreateOrConnectWithoutPropertyInput = {
    where: LeaseWhereUniqueInput
    create: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>
  }

  export type LeaseCreateManyPropertyInputEnvelope = {
    data: LeaseCreateManyPropertyInput | LeaseCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type ApplicationCreateWithoutPropertyInput = {
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    tenant: TenantCreateNestedOneWithoutApplicationsInput
    lease?: LeaseCreateNestedOneWithoutApplicationInput
  }

  export type ApplicationUncheckedCreateWithoutPropertyInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    tenantCognitoId: string
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    leaseId?: number | null
  }

  export type ApplicationCreateOrConnectWithoutPropertyInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>
  }

  export type ApplicationCreateManyPropertyInputEnvelope = {
    data: ApplicationCreateManyPropertyInput | ApplicationCreateManyPropertyInput[]
    skipDuplicates?: boolean
  }

  export type TenantCreateWithoutFavoritesInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutTenantsInput
    applications?: ApplicationCreateNestedManyWithoutTenantInput
    leases?: LeaseCreateNestedManyWithoutTenantInput
    reviews?: ReviewCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutFavoritesInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutTenantsInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutTenantInput
    leases?: LeaseUncheckedCreateNestedManyWithoutTenantInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutFavoritesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutFavoritesInput, TenantUncheckedCreateWithoutFavoritesInput>
  }

  export type TenantCreateWithoutPropertiesInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationCreateNestedManyWithoutTenantInput
    leases?: LeaseCreateNestedManyWithoutTenantInput
    reviews?: ReviewCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutPropertiesInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutTenantInput
    leases?: LeaseUncheckedCreateNestedManyWithoutTenantInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutPropertiesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutPropertiesInput, TenantUncheckedCreateWithoutPropertiesInput>
  }

  export type LocationUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutPropertiesInput, LocationUncheckedUpdateWithoutPropertiesInput>
  }

  export type LocationUpdateWithoutPropertiesInput = {
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    safetyIndicators?: SafetyIndicatorUpdateManyWithoutLocationNestedInput
    reviews?: ReviewUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    safetyIndicators?: SafetyIndicatorUncheckedUpdateManyWithoutLocationNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LandlordUpsertWithoutPropertiesInput = {
    update: XOR<LandlordUpdateWithoutPropertiesInput, LandlordUncheckedUpdateWithoutPropertiesInput>
    create: XOR<LandlordCreateWithoutPropertiesInput, LandlordUncheckedCreateWithoutPropertiesInput>
    where?: LandlordWhereInput
  }

  export type LandlordUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: LandlordWhereInput
    data: XOR<LandlordUpdateWithoutPropertiesInput, LandlordUncheckedUpdateWithoutPropertiesInput>
  }

  export type LandlordUpdateWithoutPropertiesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUpdateManyWithoutLandlordNestedInput
  }

  export type LandlordUncheckedUpdateWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutLandlordNestedInput
  }

  export type LeaseUpsertWithWhereUniqueWithoutPropertyInput = {
    where: LeaseWhereUniqueInput
    update: XOR<LeaseUpdateWithoutPropertyInput, LeaseUncheckedUpdateWithoutPropertyInput>
    create: XOR<LeaseCreateWithoutPropertyInput, LeaseUncheckedCreateWithoutPropertyInput>
  }

  export type LeaseUpdateWithWhereUniqueWithoutPropertyInput = {
    where: LeaseWhereUniqueInput
    data: XOR<LeaseUpdateWithoutPropertyInput, LeaseUncheckedUpdateWithoutPropertyInput>
  }

  export type LeaseUpdateManyWithWhereWithoutPropertyInput = {
    where: LeaseScalarWhereInput
    data: XOR<LeaseUpdateManyMutationInput, LeaseUncheckedUpdateManyWithoutPropertyInput>
  }

  export type ApplicationUpsertWithWhereUniqueWithoutPropertyInput = {
    where: ApplicationWhereUniqueInput
    update: XOR<ApplicationUpdateWithoutPropertyInput, ApplicationUncheckedUpdateWithoutPropertyInput>
    create: XOR<ApplicationCreateWithoutPropertyInput, ApplicationUncheckedCreateWithoutPropertyInput>
  }

  export type ApplicationUpdateWithWhereUniqueWithoutPropertyInput = {
    where: ApplicationWhereUniqueInput
    data: XOR<ApplicationUpdateWithoutPropertyInput, ApplicationUncheckedUpdateWithoutPropertyInput>
  }

  export type ApplicationUpdateManyWithWhereWithoutPropertyInput = {
    where: ApplicationScalarWhereInput
    data: XOR<ApplicationUpdateManyMutationInput, ApplicationUncheckedUpdateManyWithoutPropertyInput>
  }

  export type TenantUpsertWithWhereUniqueWithoutFavoritesInput = {
    where: TenantWhereUniqueInput
    update: XOR<TenantUpdateWithoutFavoritesInput, TenantUncheckedUpdateWithoutFavoritesInput>
    create: XOR<TenantCreateWithoutFavoritesInput, TenantUncheckedCreateWithoutFavoritesInput>
  }

  export type TenantUpdateWithWhereUniqueWithoutFavoritesInput = {
    where: TenantWhereUniqueInput
    data: XOR<TenantUpdateWithoutFavoritesInput, TenantUncheckedUpdateWithoutFavoritesInput>
  }

  export type TenantUpdateManyWithWhereWithoutFavoritesInput = {
    where: TenantScalarWhereInput
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyWithoutFavoritesInput>
  }

  export type TenantScalarWhereInput = {
    AND?: TenantScalarWhereInput | TenantScalarWhereInput[]
    OR?: TenantScalarWhereInput[]
    NOT?: TenantScalarWhereInput | TenantScalarWhereInput[]
    id?: IntFilter<"Tenant"> | number
    cognitoId?: StringFilter<"Tenant"> | string
    name?: StringFilter<"Tenant"> | string
    email?: StringFilter<"Tenant"> | string
    phoneNumber?: StringFilter<"Tenant"> | string
  }

  export type TenantUpsertWithWhereUniqueWithoutPropertiesInput = {
    where: TenantWhereUniqueInput
    update: XOR<TenantUpdateWithoutPropertiesInput, TenantUncheckedUpdateWithoutPropertiesInput>
    create: XOR<TenantCreateWithoutPropertiesInput, TenantUncheckedCreateWithoutPropertiesInput>
  }

  export type TenantUpdateWithWhereUniqueWithoutPropertiesInput = {
    where: TenantWhereUniqueInput
    data: XOR<TenantUpdateWithoutPropertiesInput, TenantUncheckedUpdateWithoutPropertiesInput>
  }

  export type TenantUpdateManyWithWhereWithoutPropertiesInput = {
    where: TenantScalarWhereInput
    data: XOR<TenantUpdateManyMutationInput, TenantUncheckedUpdateManyWithoutPropertiesInput>
  }

  export type PropertyCreateWithoutLocationInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    landlord: LandlordCreateNestedOneWithoutPropertiesInput
    leases?: LeaseCreateNestedManyWithoutPropertyInput
    applications?: ApplicationCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantCreateNestedManyWithoutFavoritesInput
    tenants?: TenantCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateWithoutLocationInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    landlordCognitoId: string
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantUncheckedCreateNestedManyWithoutFavoritesInput
    tenants?: TenantUncheckedCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyCreateOrConnectWithoutLocationInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>
  }

  export type PropertyUpsertWithWhereUniqueWithoutLocationInput = {
    where: PropertyWhereUniqueInput
    update: XOR<PropertyUpdateWithoutLocationInput, PropertyUncheckedUpdateWithoutLocationInput>
    create: XOR<PropertyCreateWithoutLocationInput, PropertyUncheckedCreateWithoutLocationInput>
  }

  export type PropertyCreateManyLocationInputEnvelope = {
    data: PropertyCreateManyLocationInput | PropertyCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpdateWithWhereUniqueWithoutLocationInput = {
    where: PropertyWhereUniqueInput
    data: XOR<PropertyUpdateWithoutLocationInput, PropertyUncheckedUpdateWithoutLocationInput>
  }

  export type PropertyUpdateManyWithWhereWithoutLocationInput = {
    where: PropertyScalarWhereInput
    data: XOR<PropertyUpdateManyMutationInput, PropertyUncheckedUpdateManyWithoutLocationInput>
  }

  export type SafetyIndicatorCreateWithoutLocationInput = {
    level: $Enums.SafetyLevel
    reason: string
    updatedAt?: Date | string
  }

  export type SafetyIndicatorUncheckedCreateWithoutLocationInput = {
    id?: number
    level: $Enums.SafetyLevel
    reason: string
    updatedAt?: Date | string
  }

  export type SafetyIndicatorCreateOrConnectWithoutLocationInput = {
    where: SafetyIndicatorWhereUniqueInput
    create: XOR<SafetyIndicatorCreateWithoutLocationInput, SafetyIndicatorUncheckedCreateWithoutLocationInput>
  }

  export type SafetyIndicatorUpsertWithWhereUniqueWithoutLocationInput = {
    where: SafetyIndicatorWhereUniqueInput
    update: XOR<SafetyIndicatorUpdateWithoutLocationInput, SafetyIndicatorUncheckedUpdateWithoutLocationInput>
    create: XOR<SafetyIndicatorCreateWithoutLocationInput, SafetyIndicatorUncheckedCreateWithoutLocationInput>
  }

  export type SafetyIndicatorCreateManyLocationInputEnvelope = {
    data: SafetyIndicatorCreateManyLocationInput | SafetyIndicatorCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type SafetyIndicatorUpdateWithWhereUniqueWithoutLocationInput = {
    where: SafetyIndicatorWhereUniqueInput
    data: XOR<SafetyIndicatorUpdateWithoutLocationInput, SafetyIndicatorUncheckedUpdateWithoutLocationInput>
  }

  export type SafetyIndicatorUpdateManyWithWhereWithoutLocationInput = {
    where: SafetyIndicatorScalarWhereInput
    data: XOR<SafetyIndicatorUpdateManyMutationInput, SafetyIndicatorUncheckedUpdateManyWithoutLocationInput>
  }

  export type SafetyIndicatorScalarWhereInput = {
    AND?: SafetyIndicatorScalarWhereInput | SafetyIndicatorScalarWhereInput[]
    OR?: SafetyIndicatorScalarWhereInput[]
    NOT?: SafetyIndicatorScalarWhereInput | SafetyIndicatorScalarWhereInput[]
    id?: IntFilter<"SafetyIndicator"> | number
    level?: EnumSafetyLevelFilter<"SafetyIndicator"> | $Enums.SafetyLevel
    reason?: StringFilter<"SafetyIndicator"> | string
    updatedAt?: DateTimeFilter<"SafetyIndicator"> | Date | string
    locationId?: IntFilter<"SafetyIndicator"> | number
  }

  export type ReviewCreateWithoutLocationInput = {
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenant: TenantCreateNestedOneWithoutReviewsInput
    landlord: LandlordCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutLocationInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenantId: number
    landlordId: number
  }

  export type ReviewCreateOrConnectWithoutLocationInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutLocationInput, ReviewUncheckedCreateWithoutLocationInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutLocationInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutLocationInput, ReviewUncheckedUpdateWithoutLocationInput>
    create: XOR<ReviewCreateWithoutLocationInput, ReviewUncheckedCreateWithoutLocationInput>
  }

  export type ReviewCreateManyLocationInputEnvelope = {
    data: ReviewCreateManyLocationInput | ReviewCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type ReviewUpdateWithWhereUniqueWithoutLocationInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutLocationInput, ReviewUncheckedUpdateWithoutLocationInput>
  }

  export type ReviewUpdateManyWithWhereWithoutLocationInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutLocationInput>
  }

  export type PropertyCreateWithoutApplicationsInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    location: LocationCreateNestedOneWithoutPropertiesInput
    landlord: LandlordCreateNestedOneWithoutPropertiesInput
    leases?: LeaseCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantCreateNestedManyWithoutFavoritesInput
    tenants?: TenantCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateWithoutApplicationsInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    landlordCognitoId: string
    leases?: LeaseUncheckedCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantUncheckedCreateNestedManyWithoutFavoritesInput
    tenants?: TenantUncheckedCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyCreateOrConnectWithoutApplicationsInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>
  }

  export type TenantCreateWithoutApplicationsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutTenantsInput
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput
    leases?: LeaseCreateNestedManyWithoutTenantInput
    reviews?: ReviewCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutApplicationsInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutTenantsInput
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput
    leases?: LeaseUncheckedCreateNestedManyWithoutTenantInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutApplicationsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutApplicationsInput, TenantUncheckedCreateWithoutApplicationsInput>
  }

  export type LeaseCreateWithoutApplicationInput = {
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    property: PropertyCreateNestedOneWithoutLeasesInput
    tenant: TenantCreateNestedOneWithoutLeasesInput
    payments?: PaymentCreateNestedManyWithoutLeaseInput
  }

  export type LeaseUncheckedCreateWithoutApplicationInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    propertyId: number
    tenantCognitoId: string
    payments?: PaymentUncheckedCreateNestedManyWithoutLeaseInput
  }

  export type LeaseCreateOrConnectWithoutApplicationInput = {
    where: LeaseWhereUniqueInput
    create: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>
  }

  export type PropertyUpsertWithoutApplicationsInput = {
    update: XOR<PropertyUpdateWithoutApplicationsInput, PropertyUncheckedUpdateWithoutApplicationsInput>
    create: XOR<PropertyCreateWithoutApplicationsInput, PropertyUncheckedCreateWithoutApplicationsInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutApplicationsInput, PropertyUncheckedUpdateWithoutApplicationsInput>
  }

  export type PropertyUpdateWithoutApplicationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutPropertiesNestedInput
    leases?: LeaseUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUncheckedUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUncheckedUpdateManyWithoutPropertiesNestedInput
  }

  export type TenantUpsertWithoutApplicationsInput = {
    update: XOR<TenantUpdateWithoutApplicationsInput, TenantUncheckedUpdateWithoutApplicationsInput>
    create: XOR<TenantCreateWithoutApplicationsInput, TenantUncheckedCreateWithoutApplicationsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutApplicationsInput, TenantUncheckedUpdateWithoutApplicationsInput>
  }

  export type TenantUpdateWithoutApplicationsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput
    leases?: LeaseUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutApplicationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput
    leases?: LeaseUncheckedUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type LeaseUpsertWithoutApplicationInput = {
    update: XOR<LeaseUpdateWithoutApplicationInput, LeaseUncheckedUpdateWithoutApplicationInput>
    create: XOR<LeaseCreateWithoutApplicationInput, LeaseUncheckedCreateWithoutApplicationInput>
    where?: LeaseWhereInput
  }

  export type LeaseUpdateToOneWithWhereWithoutApplicationInput = {
    where?: LeaseWhereInput
    data: XOR<LeaseUpdateWithoutApplicationInput, LeaseUncheckedUpdateWithoutApplicationInput>
  }

  export type LeaseUpdateWithoutApplicationInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutLeasesNestedInput
    payments?: PaymentUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateWithoutApplicationInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput
  }

  export type PropertyCreateWithoutLeasesInput = {
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    location: LocationCreateNestedOneWithoutPropertiesInput
    landlord: LandlordCreateNestedOneWithoutPropertiesInput
    applications?: ApplicationCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantCreateNestedManyWithoutFavoritesInput
    tenants?: TenantCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyUncheckedCreateWithoutLeasesInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
    landlordCognitoId: string
    applications?: ApplicationUncheckedCreateNestedManyWithoutPropertyInput
    favoritedBy?: TenantUncheckedCreateNestedManyWithoutFavoritesInput
    tenants?: TenantUncheckedCreateNestedManyWithoutPropertiesInput
  }

  export type PropertyCreateOrConnectWithoutLeasesInput = {
    where: PropertyWhereUniqueInput
    create: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>
  }

  export type TenantCreateWithoutLeasesInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutTenantsInput
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationCreateNestedManyWithoutTenantInput
    reviews?: ReviewCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutLeasesInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutTenantsInput
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutTenantInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutLeasesInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutLeasesInput, TenantUncheckedCreateWithoutLeasesInput>
  }

  export type ApplicationCreateWithoutLeaseInput = {
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    property: PropertyCreateNestedOneWithoutApplicationsInput
    tenant: TenantCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationUncheckedCreateWithoutLeaseInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    propertyId: number
    tenantCognitoId: string
    name: string
    email: string
    phoneNumber: string
    message?: string | null
  }

  export type ApplicationCreateOrConnectWithoutLeaseInput = {
    where: ApplicationWhereUniqueInput
    create: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>
  }

  export type PaymentCreateWithoutLeaseInput = {
    amountDue: number
    amountPaid: number
    dueDate: Date | string
    paymentDate: Date | string
    paymentStatus: $Enums.PaymentStatus
  }

  export type PaymentUncheckedCreateWithoutLeaseInput = {
    id?: number
    amountDue: number
    amountPaid: number
    dueDate: Date | string
    paymentDate: Date | string
    paymentStatus: $Enums.PaymentStatus
  }

  export type PaymentCreateOrConnectWithoutLeaseInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>
  }

  export type PaymentCreateManyLeaseInputEnvelope = {
    data: PaymentCreateManyLeaseInput | PaymentCreateManyLeaseInput[]
    skipDuplicates?: boolean
  }

  export type PropertyUpsertWithoutLeasesInput = {
    update: XOR<PropertyUpdateWithoutLeasesInput, PropertyUncheckedUpdateWithoutLeasesInput>
    create: XOR<PropertyCreateWithoutLeasesInput, PropertyUncheckedCreateWithoutLeasesInput>
    where?: PropertyWhereInput
  }

  export type PropertyUpdateToOneWithWhereWithoutLeasesInput = {
    where?: PropertyWhereInput
    data: XOR<PropertyUpdateWithoutLeasesInput, PropertyUncheckedUpdateWithoutLeasesInput>
  }

  export type PropertyUpdateWithoutLeasesInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutPropertiesNestedInput
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutLeasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUncheckedUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUncheckedUpdateManyWithoutPropertiesNestedInput
  }

  export type TenantUpsertWithoutLeasesInput = {
    update: XOR<TenantUpdateWithoutLeasesInput, TenantUncheckedUpdateWithoutLeasesInput>
    create: XOR<TenantCreateWithoutLeasesInput, TenantUncheckedCreateWithoutLeasesInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutLeasesInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutLeasesInput, TenantUncheckedUpdateWithoutLeasesInput>
  }

  export type TenantUpdateWithoutLeasesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutLeasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type ApplicationUpsertWithoutLeaseInput = {
    update: XOR<ApplicationUpdateWithoutLeaseInput, ApplicationUncheckedUpdateWithoutLeaseInput>
    create: XOR<ApplicationCreateWithoutLeaseInput, ApplicationUncheckedCreateWithoutLeaseInput>
    where?: ApplicationWhereInput
  }

  export type ApplicationUpdateToOneWithWhereWithoutLeaseInput = {
    where?: ApplicationWhereInput
    data: XOR<ApplicationUpdateWithoutLeaseInput, ApplicationUncheckedUpdateWithoutLeaseInput>
  }

  export type ApplicationUpdateWithoutLeaseInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutApplicationsNestedInput
    tenant?: TenantUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutLeaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PaymentUpsertWithWhereUniqueWithoutLeaseInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutLeaseInput, PaymentUncheckedUpdateWithoutLeaseInput>
    create: XOR<PaymentCreateWithoutLeaseInput, PaymentUncheckedCreateWithoutLeaseInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutLeaseInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutLeaseInput, PaymentUncheckedUpdateWithoutLeaseInput>
  }

  export type PaymentUpdateManyWithWhereWithoutLeaseInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutLeaseInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    amountDue?: FloatFilter<"Payment"> | number
    amountPaid?: FloatFilter<"Payment"> | number
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    paymentDate?: DateTimeFilter<"Payment"> | Date | string
    paymentStatus?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    leaseId?: IntFilter<"Payment"> | number
  }

  export type LeaseCreateWithoutPaymentsInput = {
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    property: PropertyCreateNestedOneWithoutLeasesInput
    tenant: TenantCreateNestedOneWithoutLeasesInput
    application?: ApplicationCreateNestedOneWithoutLeaseInput
  }

  export type LeaseUncheckedCreateWithoutPaymentsInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    propertyId: number
    tenantCognitoId: string
    application?: ApplicationUncheckedCreateNestedOneWithoutLeaseInput
  }

  export type LeaseCreateOrConnectWithoutPaymentsInput = {
    where: LeaseWhereUniqueInput
    create: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>
  }

  export type LeaseUpsertWithoutPaymentsInput = {
    update: XOR<LeaseUpdateWithoutPaymentsInput, LeaseUncheckedUpdateWithoutPaymentsInput>
    create: XOR<LeaseCreateWithoutPaymentsInput, LeaseUncheckedCreateWithoutPaymentsInput>
    where?: LeaseWhereInput
  }

  export type LeaseUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: LeaseWhereInput
    data: XOR<LeaseUpdateWithoutPaymentsInput, LeaseUncheckedUpdateWithoutPaymentsInput>
  }

  export type LeaseUpdateWithoutPaymentsInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput
    tenant?: TenantUpdateOneRequiredWithoutLeasesNestedInput
    application?: ApplicationUpdateOneWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    propertyId?: IntFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput
  }

  export type TenantCreateWithoutReviewsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutTenantsInput
    favorites?: PropertyCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationCreateNestedManyWithoutTenantInput
    leases?: LeaseCreateNestedManyWithoutTenantInput
  }

  export type TenantUncheckedCreateWithoutReviewsInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutTenantsInput
    favorites?: PropertyUncheckedCreateNestedManyWithoutFavoritedByInput
    applications?: ApplicationUncheckedCreateNestedManyWithoutTenantInput
    leases?: LeaseUncheckedCreateNestedManyWithoutTenantInput
  }

  export type TenantCreateOrConnectWithoutReviewsInput = {
    where: TenantWhereUniqueInput
    create: XOR<TenantCreateWithoutReviewsInput, TenantUncheckedCreateWithoutReviewsInput>
  }

  export type LandlordCreateWithoutReviewsInput = {
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyCreateNestedManyWithoutLandlordInput
  }

  export type LandlordUncheckedCreateWithoutReviewsInput = {
    id?: number
    cognitoId: string
    name: string
    email: string
    phoneNumber: string
    properties?: PropertyUncheckedCreateNestedManyWithoutLandlordInput
  }

  export type LandlordCreateOrConnectWithoutReviewsInput = {
    where: LandlordWhereUniqueInput
    create: XOR<LandlordCreateWithoutReviewsInput, LandlordUncheckedCreateWithoutReviewsInput>
  }

  export type TenantUpsertWithoutReviewsInput = {
    update: XOR<TenantUpdateWithoutReviewsInput, TenantUncheckedUpdateWithoutReviewsInput>
    create: XOR<TenantCreateWithoutReviewsInput, TenantUncheckedCreateWithoutReviewsInput>
    where?: TenantWhereInput
  }

  export type TenantUpdateToOneWithWhereWithoutReviewsInput = {
    where?: TenantWhereInput
    data: XOR<TenantUpdateWithoutReviewsInput, TenantUncheckedUpdateWithoutReviewsInput>
  }

  export type TenantUpdateWithoutReviewsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUpdateManyWithoutTenantNestedInput
    leases?: LeaseUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutTenantsNestedInput
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutTenantNestedInput
    leases?: LeaseUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type LandlordUpsertWithoutReviewsInput = {
    update: XOR<LandlordUpdateWithoutReviewsInput, LandlordUncheckedUpdateWithoutReviewsInput>
    create: XOR<LandlordCreateWithoutReviewsInput, LandlordUncheckedCreateWithoutReviewsInput>
    where?: LandlordWhereInput
  }

  export type LandlordUpdateToOneWithWhereWithoutReviewsInput = {
    where?: LandlordWhereInput
    data: XOR<LandlordUpdateWithoutReviewsInput, LandlordUncheckedUpdateWithoutReviewsInput>
  }

  export type LandlordUpdateWithoutReviewsInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutLandlordNestedInput
  }

  export type LandlordUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutLandlordNestedInput
  }

  export type LocationUpdateToOneWithWhereWithoutReviewsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutReviewsInput, LocationUncheckedUpdateWithoutReviewsInput>
  }

  export type LocationUpdateWithoutReviewsInput = {
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutLocationNestedInput
    safetyIndicators?: SafetyIndicatorUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutLocationNestedInput
    safetyIndicators?: SafetyIndicatorUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type LocationUpdateToOneWithWhereWithoutSafetyIndicatorsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutSafetyIndicatorsInput, LocationUncheckedUpdateWithoutSafetyIndicatorsInput>
  }

  export type LocationUpdateWithoutSafetyIndicatorsInput = {
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutLocationNestedInput
    reviews?: ReviewUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutSafetyIndicatorsInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: StringFieldUpdateOperationsInput | string
    city?: StringFieldUpdateOperationsInput | string
    state?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    postalCode?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutLocationNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type PropertyCreateManyLandlordInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    applicationFee: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    locationId: number
  }

  export type ReviewCreateManyLandlordInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenantId: number
    locationId: number
  }

  export type PropertyUpdateWithoutLandlordInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput
    leases?: LeaseUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutLandlordInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUncheckedUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUncheckedUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateManyWithoutLandlordInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUpdateWithoutLandlordInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutReviewsNestedInput
    location?: LocationUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutLandlordInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUncheckedUpdateManyWithoutLandlordInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type ApplicationCreateManyTenantInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    propertyId: number
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    leaseId?: number | null
  }

  export type LeaseCreateManyTenantInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    propertyId: number
  }

  export type ReviewCreateManyTenantInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    landlordId: number
    locationId: number
  }

  export type PropertyUpdateWithoutTenantsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutPropertiesNestedInput
    leases?: LeaseUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUpdateManyWithoutFavoritesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutTenantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUncheckedUpdateManyWithoutFavoritesNestedInput
  }

  export type PropertyUncheckedUpdateManyWithoutTenantsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyUpdateWithoutFavoritedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    location?: LocationUpdateOneRequiredWithoutPropertiesNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutPropertiesNestedInput
    leases?: LeaseUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput
    tenants?: TenantUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutFavoritedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput
    tenants?: TenantUncheckedUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateManyWithoutFavoritedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    locationId?: IntFieldUpdateOperationsInput | number
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicationUpdateWithoutTenantInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    property?: PropertyUpdateOneRequiredWithoutApplicationsNestedInput
    lease?: LeaseUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutTenantInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    propertyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicationUncheckedUpdateManyWithoutTenantInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    propertyId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LeaseUpdateWithoutTenantInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    property?: PropertyUpdateOneRequiredWithoutLeasesNestedInput
    application?: ApplicationUpdateOneWithoutLeaseNestedInput
    payments?: PaymentUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateWithoutTenantInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    propertyId?: IntFieldUpdateOperationsInput | number
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateManyWithoutTenantInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    propertyId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUpdateWithoutTenantInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    landlord?: LandlordUpdateOneRequiredWithoutReviewsNestedInput
    location?: LocationUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutTenantInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    landlordId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUncheckedUpdateManyWithoutTenantInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    landlordId?: IntFieldUpdateOperationsInput | number
    locationId?: IntFieldUpdateOperationsInput | number
  }

  export type LeaseCreateManyPropertyInput = {
    id?: number
    startDate: Date | string
    endDate: Date | string
    rent: number
    deposit: number
    tenantCognitoId: string
  }

  export type ApplicationCreateManyPropertyInput = {
    id?: number
    applicationDate: Date | string
    status: $Enums.ApplicationStatus
    tenantCognitoId: string
    name: string
    email: string
    phoneNumber: string
    message?: string | null
    leaseId?: number | null
  }

  export type LeaseUpdateWithoutPropertyInput = {
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    tenant?: TenantUpdateOneRequiredWithoutLeasesNestedInput
    application?: ApplicationUpdateOneWithoutLeaseNestedInput
    payments?: PaymentUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    application?: ApplicationUncheckedUpdateOneWithoutLeaseNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutLeaseNestedInput
  }

  export type LeaseUncheckedUpdateManyWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    rent?: FloatFieldUpdateOperationsInput | number
    deposit?: FloatFieldUpdateOperationsInput | number
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicationUpdateWithoutPropertyInput = {
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    tenant?: TenantUpdateOneRequiredWithoutApplicationsNestedInput
    lease?: LeaseUpdateOneWithoutApplicationNestedInput
  }

  export type ApplicationUncheckedUpdateWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ApplicationUncheckedUpdateManyWithoutPropertyInput = {
    id?: IntFieldUpdateOperationsInput | number
    applicationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumApplicationStatusFieldUpdateOperationsInput | $Enums.ApplicationStatus
    tenantCognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    leaseId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type TenantUpdateWithoutFavoritesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUpdateManyWithoutTenantsNestedInput
    applications?: ApplicationUpdateManyWithoutTenantNestedInput
    leases?: LeaseUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    properties?: PropertyUncheckedUpdateManyWithoutTenantsNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutTenantNestedInput
    leases?: LeaseUncheckedUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateManyWithoutFavoritesInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type TenantUpdateWithoutPropertiesInput = {
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    favorites?: PropertyUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUpdateManyWithoutTenantNestedInput
    leases?: LeaseUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    favorites?: PropertyUncheckedUpdateManyWithoutFavoritedByNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutTenantNestedInput
    leases?: LeaseUncheckedUpdateManyWithoutTenantNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutTenantNestedInput
  }

  export type TenantUncheckedUpdateManyWithoutPropertiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    cognitoId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
  }

  export type PropertyUpdateWithoutLocationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    landlord?: LandlordUpdateOneRequiredWithoutPropertiesNestedInput
    leases?: LeaseUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
    leases?: LeaseUncheckedUpdateManyWithoutPropertyNestedInput
    applications?: ApplicationUncheckedUpdateManyWithoutPropertyNestedInput
    favoritedBy?: TenantUncheckedUpdateManyWithoutFavoritesNestedInput
    tenants?: TenantUncheckedUpdateManyWithoutPropertiesNestedInput
  }

  export type PropertyCreateManyLocationInput = {
    id?: number
    name: string
    description: string
    pricePerMonth: number
    securityDeposit: number
    photoUrls?: PropertyCreatephotoUrlsInput | string[]
    amenities?: PropertyCreateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyCreatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: boolean
    isParkingIncluded?: boolean
    isBachelorFriendly?: boolean
    isFemaleOnly?: boolean
    genderPreference?: $Enums.GenderPreference | null
    beds: number
    baths: number
    squareFeet: number
    propertyType: $Enums.PropertyType
    postedDate?: Date | string
    averageRating?: number | null
    numberOfReviews?: number | null
    landlordCognitoId: string
  }

  export type PropertyUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    pricePerMonth?: FloatFieldUpdateOperationsInput | number
    securityDeposit?: FloatFieldUpdateOperationsInput | number
    applicationFee?: FloatFieldUpdateOperationsInput | number
    photoUrls?: PropertyUpdatephotoUrlsInput | string[]
    amenities?: PropertyUpdateamenitiesInput | $Enums.Amenity[]
    highlights?: PropertyUpdatehighlightsInput | $Enums.Highlight[]
    isPetsAllowed?: BoolFieldUpdateOperationsInput | boolean
    isParkingIncluded?: BoolFieldUpdateOperationsInput | boolean
    isBachelorFriendly?: BoolFieldUpdateOperationsInput | boolean
    isFemaleOnly?: BoolFieldUpdateOperationsInput | boolean
    genderPreference?: NullableEnumGenderPreferenceFieldUpdateOperationsInput | $Enums.GenderPreference | null
    beds?: IntFieldUpdateOperationsInput | number
    baths?: FloatFieldUpdateOperationsInput | number
    squareFeet?: IntFieldUpdateOperationsInput | number
    propertyType?: EnumPropertyTypeFieldUpdateOperationsInput | $Enums.PropertyType
    postedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    averageRating?: NullableFloatFieldUpdateOperationsInput | number | null
    numberOfReviews?: NullableIntFieldUpdateOperationsInput | number | null
    landlordCognitoId?: StringFieldUpdateOperationsInput | string
  }

  export type SafetyIndicatorUpdateWithoutLocationInput = {
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafetyIndicatorUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SafetyIndicatorCreateManyLocationInput = {
    id?: number
    level: $Enums.SafetyLevel
    reason: string
    updatedAt?: Date | string
  }

  export type SafetyIndicatorUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    level?: EnumSafetyLevelFieldUpdateOperationsInput | $Enums.SafetyLevel
    reason?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutLocationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenant?: TenantUpdateOneRequiredWithoutReviewsNestedInput
    landlord?: LandlordUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: IntFieldUpdateOperationsInput | number
    landlordId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewCreateManyLocationInput = {
    id?: number
    rating?: number
    comment?: string | null
    createdAt?: Date | string
    tenantId: number
    landlordId: number
  }

  export type ReviewUncheckedUpdateManyWithoutLocationInput = {
    id?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tenantId?: IntFieldUpdateOperationsInput | number
    landlordId?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateManyLeaseInput = {
    id?: number
    amountDue: number
    amountPaid: number
    dueDate: Date | string
    paymentDate: Date | string
    paymentStatus: $Enums.PaymentStatus
  }

  export type PaymentUpdateWithoutLeaseInput = {
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  }

  export type PaymentUncheckedUpdateWithoutLeaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  }

  export type PaymentUncheckedUpdateManyWithoutLeaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    amountDue?: FloatFieldUpdateOperationsInput | number
    amountPaid?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paymentStatus?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}