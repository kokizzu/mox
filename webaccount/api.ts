// NOTE: GENERATED by github.com/mjl-/sherpats, DO NOT MODIFY

namespace api {

// Domain is a domain name, with one or more labels, with at least an ASCII
// representation, and for IDNA non-ASCII domains a unicode representation.
// The ASCII string must be used for DNS lookups. The strings do not have a
// trailing dot. When using with StrictResolver, add the trailing dot.
export interface Domain {
	ASCII: string  // A non-unicode domain, e.g. with A-labels (xn--...) or NR-LDH (non-reserved letters/digits/hyphens) labels. Always in lower case. No trailing dot.
	Unicode: string  // Name as U-labels, in Unicode NFC. Empty if this is an ASCII-only domain. No trailing dot.
}

export interface Destination {
	Mailbox: string
	Rulesets?: Ruleset[] | null
	FullName: string
}

export interface Ruleset {
	SMTPMailFromRegexp: string
	VerifiedDomain: string
	HeadersRegexp?: { [key: string]: string }
	IsForward: boolean  // todo: once we implement ARC, we can use dkim domains that we cannot verify but that the arc-verified forwarding mail server was able to verify.
	ListAllowDomain: string
	AcceptRejectsToMailbox: string
	Mailbox: string
	VerifiedDNSDomain: Domain
	ListAllowDNSDomain: Domain
}

// ImportProgress is returned after uploading a file to import.
export interface ImportProgress {
	Token: string  // For fetching progress, or cancelling an import.
}

export type CSRFToken = string

export const structTypes: {[typename: string]: boolean} = {"Destination":true,"Domain":true,"ImportProgress":true,"Ruleset":true}
export const stringsTypes: {[typename: string]: boolean} = {"CSRFToken":true}
export const intsTypes: {[typename: string]: boolean} = {}
export const types: TypenameMap = {
	"Domain": {"Name":"Domain","Docs":"","Fields":[{"Name":"ASCII","Docs":"","Typewords":["string"]},{"Name":"Unicode","Docs":"","Typewords":["string"]}]},
	"Destination": {"Name":"Destination","Docs":"","Fields":[{"Name":"Mailbox","Docs":"","Typewords":["string"]},{"Name":"Rulesets","Docs":"","Typewords":["[]","Ruleset"]},{"Name":"FullName","Docs":"","Typewords":["string"]}]},
	"Ruleset": {"Name":"Ruleset","Docs":"","Fields":[{"Name":"SMTPMailFromRegexp","Docs":"","Typewords":["string"]},{"Name":"VerifiedDomain","Docs":"","Typewords":["string"]},{"Name":"HeadersRegexp","Docs":"","Typewords":["{}","string"]},{"Name":"IsForward","Docs":"","Typewords":["bool"]},{"Name":"ListAllowDomain","Docs":"","Typewords":["string"]},{"Name":"AcceptRejectsToMailbox","Docs":"","Typewords":["string"]},{"Name":"Mailbox","Docs":"","Typewords":["string"]},{"Name":"VerifiedDNSDomain","Docs":"","Typewords":["Domain"]},{"Name":"ListAllowDNSDomain","Docs":"","Typewords":["Domain"]}]},
	"ImportProgress": {"Name":"ImportProgress","Docs":"","Fields":[{"Name":"Token","Docs":"","Typewords":["string"]}]},
	"CSRFToken": {"Name":"CSRFToken","Docs":"","Values":null},
}

export const parser = {
	Domain: (v: any) => parse("Domain", v) as Domain,
	Destination: (v: any) => parse("Destination", v) as Destination,
	Ruleset: (v: any) => parse("Ruleset", v) as Ruleset,
	ImportProgress: (v: any) => parse("ImportProgress", v) as ImportProgress,
	CSRFToken: (v: any) => parse("CSRFToken", v) as CSRFToken,
}

// Account exports web API functions for the account web interface. All its
// methods are exported under api/. Function calls require valid HTTP
// Authentication credentials of a user.
let defaultOptions: ClientOptions = {slicesNullable: true, mapsNullable: true, nullableOptional: true}

export class Client {
	private baseURL: string
	public authState: AuthState
	public options: ClientOptions

	constructor() {
		this.authState = {}
		this.options = {...defaultOptions}
		this.baseURL = this.options.baseURL || defaultBaseURL
	}

	withAuthToken(token: string): Client {
		const c = new Client()
		c.authState.token = token
		c.options = this.options
		return c
	}

	withOptions(options: ClientOptions): Client {
		const c = new Client()
		c.authState = this.authState
		c.options = { ...this.options, ...options }
		return c
	}

	// LoginPrep returns a login token, and also sets it as cookie. Both must be
	// present in the call to Login.
	async LoginPrep(): Promise<string> {
		const fn: string = "LoginPrep"
		const paramTypes: string[][] = []
		const returnTypes: string[][] = [["string"]]
		const params: any[] = []
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as string
	}

	// Login returns a session token for the credentials, or fails with error code
	// "user:badLogin". Call LoginPrep to get a loginToken.
	async Login(loginToken: string, username: string, password: string): Promise<CSRFToken> {
		const fn: string = "Login"
		const paramTypes: string[][] = [["string"],["string"],["string"]]
		const returnTypes: string[][] = [["CSRFToken"]]
		const params: any[] = [loginToken, username, password]
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as CSRFToken
	}

	// Logout invalidates the session token.
	async Logout(): Promise<void> {
		const fn: string = "Logout"
		const paramTypes: string[][] = []
		const returnTypes: string[][] = []
		const params: any[] = []
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as void
	}

	// SetPassword saves a new password for the account, invalidating the previous password.
	// Sessions are not interrupted, and will keep working. New login attempts must use the new password.
	// Password must be at least 8 characters.
	async SetPassword(password: string): Promise<void> {
		const fn: string = "SetPassword"
		const paramTypes: string[][] = [["string"]]
		const returnTypes: string[][] = []
		const params: any[] = [password]
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as void
	}

	// Account returns information about the account: full name, the default domain,
	// and the destinations (keys are email addresses, or localparts to the default
	// domain). todo: replace with a function that returns the whole account, when
	// sherpadoc understands unnamed struct fields.
	async Account(): Promise<[string, Domain, { [key: string]: Destination }]> {
		const fn: string = "Account"
		const paramTypes: string[][] = []
		const returnTypes: string[][] = [["string"],["Domain"],["{}","Destination"]]
		const params: any[] = []
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as [string, Domain, { [key: string]: Destination }]
	}

	async AccountSaveFullName(fullName: string): Promise<void> {
		const fn: string = "AccountSaveFullName"
		const paramTypes: string[][] = [["string"]]
		const returnTypes: string[][] = []
		const params: any[] = [fullName]
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as void
	}

	// DestinationSave updates a destination.
	// OldDest is compared against the current destination. If it does not match, an
	// error is returned. Otherwise newDest is saved and the configuration reloaded.
	async DestinationSave(destName: string, oldDest: Destination, newDest: Destination): Promise<void> {
		const fn: string = "DestinationSave"
		const paramTypes: string[][] = [["string"],["Destination"],["Destination"]]
		const returnTypes: string[][] = []
		const params: any[] = [destName, oldDest, newDest]
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as void
	}

	// ImportAbort aborts an import that is in progress. If the import exists and isn't
	// finished, no changes will have been made by the import.
	async ImportAbort(importToken: string): Promise<void> {
		const fn: string = "ImportAbort"
		const paramTypes: string[][] = [["string"]]
		const returnTypes: string[][] = []
		const params: any[] = [importToken]
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as void
	}

	// Types exposes types not used in API method signatures, such as the import form upload.
	async Types(): Promise<ImportProgress> {
		const fn: string = "Types"
		const paramTypes: string[][] = []
		const returnTypes: string[][] = [["ImportProgress"]]
		const params: any[] = []
		return await _sherpaCall(this.baseURL, this.authState, { ...this.options }, paramTypes, returnTypes, fn, params) as ImportProgress
	}
}

export const defaultBaseURL = (function() {
	let p = location.pathname
	if (p && p[p.length - 1] !== '/') {
		let l = location.pathname.split('/')
		l = l.slice(0, l.length - 1)
		p = '/' + l.join('/') + '/'
	}
	return location.protocol + '//' + location.host + p + 'api/'
})()

// NOTE: code below is shared between github.com/mjl-/sherpaweb and github.com/mjl-/sherpats.
// KEEP IN SYNC.

export const supportedSherpaVersion = 1

export interface Section {
	Name: string
	Docs: string
	Functions: Function[]
	Sections: Section[]
	Structs: Struct[]
	Ints: Ints[]
	Strings: Strings[]
	Version: string // only for top-level section
	SherpaVersion: number // only for top-level section
	SherpadocVersion: number // only for top-level section
}

export interface Function {
	Name: string
	Docs: string
	Params: Arg[]
	Returns: Arg[]
}

export interface Arg {
	Name: string
	Typewords: string[]
}

export interface Struct {
	Name: string
	Docs: string
	Fields: Field[]
}

export interface Field {
	Name: string
	Docs: string
	Typewords: string[]
}

export interface Ints {
	Name: string
	Docs: string
	Values: {
		Name: string
		Value: number
		Docs: string
	}[] | null
}

export interface Strings {
	Name: string
	Docs: string
	Values: {
		Name: string
		Value: string
		Docs: string
	}[] | null
}

export type NamedType = Struct | Strings | Ints
export type TypenameMap = { [k: string]: NamedType }

// verifyArg typechecks "v" against "typewords", returning a new (possibly modified) value for JSON-encoding.
// toJS indicate if the data is coming into JS. If so, timestamps are turned into JS Dates. Otherwise, JS Dates are turned into strings.
// allowUnknownKeys configures whether unknown keys in structs are allowed.
// types are the named types of the API.
export const verifyArg = (path: string, v: any, typewords: string[], toJS: boolean, allowUnknownKeys: boolean, types: TypenameMap, opts: ClientOptions): any => {
	return new verifier(types, toJS, allowUnknownKeys, opts).verify(path, v, typewords)
}

export const parse = (name: string, v: any): any => verifyArg(name, v, [name], true, false, types, defaultOptions)

class verifier {
	constructor(private types: TypenameMap, private toJS: boolean, private allowUnknownKeys: boolean, private opts: ClientOptions) {
	}

	verify(path: string, v: any, typewords: string[]): any {
		typewords = typewords.slice(0)
		const ww = typewords.shift()

		const error = (msg: string) => {
			if (path != '') {
				msg = path + ': ' + msg
			}
			throw new Error(msg)
		}

		if (typeof ww !== 'string') {
			error('bad typewords')
			return // should not be necessary, typescript doesn't see error always throws an exception?
		}
		const w: string = ww

		const ensure = (ok: boolean, expect: string): any => {
			if (!ok) {
				error('got ' + JSON.stringify(v) + ', expected ' + expect)
			}
			return v
		}

		switch (w) {
		case 'nullable':
			if (v === null || v === undefined && this.opts.nullableOptional) {
				return v
			}
			return this.verify(path, v, typewords)
		case '[]':
			if (v === null && this.opts.slicesNullable || v === undefined && this.opts.slicesNullable && this.opts.nullableOptional) {
				return v
			}
			ensure(Array.isArray(v), "array")
			return v.map((e: any, i: number) => this.verify(path + '[' + i + ']', e, typewords))
		case '{}':
			if (v === null && this.opts.mapsNullable || v === undefined && this.opts.mapsNullable && this.opts.nullableOptional) {
				return v
			}
			ensure(v !== null || typeof v === 'object', "object")
			const r: any = {}
			for (const k in v) {
				r[k] = this.verify(path + '.' + k, v[k], typewords)
			}
			return r
		}

		ensure(typewords.length == 0, "empty typewords")
		const t = typeof v
		switch (w) {
		case 'any':
			return v
		case 'bool':
			ensure(t === 'boolean', 'bool')
			return v
		case 'int8':
		case 'uint8':
		case 'int16':
		case 'uint16':
		case 'int32':
		case 'uint32':
		case 'int64':
		case 'uint64':
			ensure(t === 'number' && Number.isInteger(v), 'integer')
			return v
		case 'float32':
		case 'float64':
			ensure(t === 'number', 'float')
			return v
		case 'int64s':
		case 'uint64s':
			ensure(t === 'number' && Number.isInteger(v) || t === 'string', 'integer fitting in float without precision loss, or string')
			return '' + v
		case 'string':
			ensure(t === 'string', 'string')
			return v
		case 'timestamp':
			if (this.toJS) {
				ensure(t === 'string', 'string, with timestamp')
				const d = new Date(v)
				if (d instanceof Date && !isNaN(d.getTime())) {
					return d
				}
				error('invalid date ' + v)
			} else {
				ensure(t === 'object' && v !== null, 'non-null object')
				ensure(v.__proto__ === Date.prototype, 'Date')
				return v.toISOString()
			}
		}

		// We're left with named types.
		const nt = this.types[w]
		if (!nt) {
			error('unknown type ' + w)
		}
		if (v === null) {
			error('bad value ' + v + ' for named type ' + w)
		}

		if (structTypes[nt.Name]) {
			const t = nt as Struct
			if (typeof v !== 'object') {
				error('bad value ' + v + ' for struct ' + w)
			}

			const r: any = {}
			for (const f of t.Fields) {
				r[f.Name] = this.verify(path + '.' + f.Name, v[f.Name], f.Typewords)
			}
			// If going to JSON also verify no unknown fields are present.
			if (!this.allowUnknownKeys) {
				const known: { [key: string]: boolean } = {}
				for (const f of t.Fields) {
					known[f.Name] = true
				}
				Object.keys(v).forEach((k) => {
					if (!known[k]) {
						error('unknown key ' + k + ' for struct ' + w)
					}
				})
			}
			return r
		} else if (stringsTypes[nt.Name]) {
			const t = nt as Strings
			if (typeof v !== 'string') {
				error('mistyped value ' + v + ' for named strings ' + t.Name)
			}
			if (!t.Values || t.Values.length === 0) {
				return v
			}
			for (const sv of t.Values) {
				if (sv.Value === v) {
					return v
				}
			}
			error('unknkown value ' + v + ' for named strings ' + t.Name)
		} else if (intsTypes[nt.Name]) {
			const t = nt as Ints
			if (typeof v !== 'number' || !Number.isInteger(v)) {
				error('mistyped value ' + v + ' for named ints ' + t.Name)
			}
			if (!t.Values || t.Values.length === 0) {
				return v
			}
			for (const sv of t.Values) {
				if (sv.Value === v) {
					return v
				}
			}
			error('unknkown value ' + v + ' for named ints ' + t.Name)
		} else {
			throw new Error('unexpected named type ' + nt)
		}
	}
}


export interface ClientOptions {
	baseURL?: string
	aborter?: {abort?: () => void}
	timeoutMsec?: number
	skipParamCheck?: boolean
	skipReturnCheck?: boolean
	slicesNullable?: boolean
	mapsNullable?: boolean
	nullableOptional?: boolean
	csrfHeader?: string
	login?: (reason: string) => Promise<string>
}

export interface AuthState {
	token?: string // For csrf request header.
	loginPromise?: Promise<void> // To let multiple API calls wait for a single login attempt, not each opening a login popup.
}

const _sherpaCall = async (baseURL: string, authState: AuthState, options: ClientOptions, paramTypes: string[][], returnTypes: string[][], name: string, params: any[]): Promise<any> => {
	if (!options.skipParamCheck) {
		if (params.length !== paramTypes.length) {
			return Promise.reject({ message: 'wrong number of parameters in sherpa call, saw ' + params.length + ' != expected ' + paramTypes.length })
		}
		params = params.map((v: any, index: number) => verifyArg('params[' + index + ']', v, paramTypes[index], false, false, types, options))
	}
	const simulate = async (json: string) => {
		const config = JSON.parse(json || 'null') || {}
		const waitMinMsec = config.waitMinMsec || 0
		const waitMaxMsec = config.waitMaxMsec || 0
		const wait = Math.random() * (waitMaxMsec - waitMinMsec)
		const failRate = config.failRate || 0
		return new Promise<void>((resolve, reject) => {
			if (options.aborter) {
				options.aborter.abort = () => {
					reject({ message: 'call to ' + name + ' aborted by user', code: 'sherpa:aborted' })
					reject = resolve = () => { }
				}
			}
			setTimeout(() => {
				const r = Math.random()
				if (r < failRate) {
					reject({ message: 'injected failure on ' + name, code: 'server:injected' })
				} else {
					resolve()
				}
				reject = resolve = () => { }
			}, waitMinMsec + wait)
		})
	}
	// Only simulate when there is a debug string. Otherwise it would always interfere
	// with setting options.aborter.
	let json: string = ''
	try {
		json = window.localStorage.getItem('sherpats-debug') || ''
	} catch (err) {}
	if (json) {
		await simulate(json)
	}

	const fn = (resolve: (v: any) => void, reject: (v: any) => void) => {
		let resolve1 = (v: any) => {
			resolve(v)
			resolve1 = () => { }
			reject1 = () => { }
		}
		let reject1 = (v: { code: string, message: string }) => {
			if ((v.code === 'user:noAuth' || v.code === 'user:badAuth')  && options.login) {
				const login = options.login
				if (!authState.loginPromise) {
					authState.loginPromise = new Promise((aresolve, areject) => {
						login(v.code === 'user:badAuth' ? (v.message || '') : '')
						.then((token) => {
							authState.token = token
							authState.loginPromise = undefined
							aresolve()
						}, (err: any) => {
							authState.loginPromise = undefined
							areject(err)
						})
					})
				}
				authState.loginPromise
				.then(() => {
					fn(resolve, reject)
				}, (err: any) => {
					reject(err)
				})
				return
			}
			reject(v)
			resolve1 = () => { }
			reject1 = () => { }
		}

		const url = baseURL + name
		const req = new window.XMLHttpRequest()
		if (options.aborter) {
			options.aborter.abort = () => {
				req.abort()
				reject1({ code: 'sherpa:aborted', message: 'request aborted' })
			}
		}
		req.open('POST', url, true)
		if (options.csrfHeader && authState.token) {
			req.setRequestHeader(options.csrfHeader, authState.token)
		}
		if (options.timeoutMsec) {
			req.timeout = options.timeoutMsec
		}
		req.onload = () => {
			if (req.status !== 200) {
				if (req.status === 404) {
					reject1({ code: 'sherpa:badFunction', message: 'function does not exist' })
				} else {
					reject1({ code: 'sherpa:http', message: 'error calling function, HTTP status: ' + req.status })
				}
				return
			}

			let resp: any
			try {
				resp = JSON.parse(req.responseText)
			} catch (err) {
				reject1({ code: 'sherpa:badResponse', message: 'bad JSON from server' })
				return
			}
			if (resp && resp.error) {
				const err = resp.error
				reject1({ code: err.code, message: err.message })
				return
			} else if (!resp || !resp.hasOwnProperty('result')) {
				reject1({ code: 'sherpa:badResponse', message: "invalid sherpa response object, missing 'result'" })
				return
			}

			if (options.skipReturnCheck) {
				resolve1(resp.result)
				return
			}
			let result = resp.result
			try {
				if (returnTypes.length === 0) {
					if (result) {
						throw new Error('function ' + name + ' returned a value while prototype says it returns "void"')
					}
				} else if (returnTypes.length === 1) {
					result = verifyArg('result', result, returnTypes[0], true, true, types, options)
				} else {
					if (result.length != returnTypes.length) {
						throw new Error('wrong number of values returned by ' + name + ', saw ' + result.length + ' != expected ' + returnTypes.length)
					}
					result = result.map((v: any, index: number) => verifyArg('result[' + index + ']', v, returnTypes[index], true, true, types, options))
				}
			} catch (err) {
				let errmsg = 'bad types'
				if (err instanceof Error) {
					errmsg = err.message
				}
				reject1({ code: 'sherpa:badTypes', message: errmsg })
			}
			resolve1(result)
		}
		req.onerror = () => {
			reject1({ code: 'sherpa:connection', message: 'connection failed' })
		}
		req.ontimeout = () => {
			reject1({ code: 'sherpa:timeout', message: 'request timeout' })
		}
		req.setRequestHeader('Content-Type', 'application/json')
		try {
			req.send(JSON.stringify({ params: params }))
		} catch (err) {
			reject1({ code: 'sherpa:badData', message: 'cannot marshal to JSON' })
		}
	}
	return await new Promise(fn)
}

}
