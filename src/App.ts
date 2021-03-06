import {ObjectString} from 'gollumts-objecttype';

export interface ServiceOptions {
	args?: any[];
	tags?: string[];
}

interface ContainerValue {
	clazz: any;
	options: ServiceOptions;
	instance: any;
}

export abstract class App {
	
	public static DEFAULT_CONTAINER_NAME = 'default';
	public static SERVICE_NAME_PROPERTY = '__gts_sarvicename__';
	
	private static _instances: ObjectString<App> = {};
	
	public static getInstance(name: string = App.DEFAULT_CONTAINER_NAME): App {
		const container = this._instances[name];
		if (!container) {
			throw new Error('Container '+name+' not found.');
		}
		return container;
	}
	
	private _containerName: string;
	private _container: ObjectString<ContainerValue> = {};
	private _taggedServices: ObjectString<any[]> = {};
	
	public constructor (name: string = App.DEFAULT_CONTAINER_NAME) {
		this._containerName = name;
		App._instances[name] = this;
		this.set('app', this);
	}
	
	public set(name: string, value: any, options: ServiceOptions = {}): void {
		name = name.toLowerCase();
		const service = {
			clazz: value.constructor,
			instance: value,
			options: options
		}
		this.resetTaggedCache(service);
		this._container[name] = service;
	}
	
	public has(name: string): boolean {
		name = name.toLowerCase();
		return !!this._container[name];
	}
	
	public declare(name: string, clazz: any, options: ServiceOptions = {}): void {
		name = name.toLowerCase();
		const service = {
			clazz: clazz,
			instance: null,
			options: options,
		}
		this.resetTaggedCache(service);
		this._container[name] = service;
	}
	
	private resetTaggedCache(service: ContainerValue): void {
		service.options.tags = service.options.tags ? service.options.tags : [];
		if (service.clazz && service.clazz.__gollumts_service_tagged__) {
			service.options.tags = service.options.tags.concat(service.clazz.__gollumts_service_tagged__);
		}
		service.options.tags = service.options.tags.filter((value, index, self) => self.indexOf(value) === index);
		if (service.options.tags) {
			service.options.tags.forEach(tagName => {
				if (this._taggedServices[tagName]) delete this._taggedServices[tagName];
			});
		}
	}
	
	public get<T>(name): T {
		name = name.toLowerCase();
		const target = this._container[name];
		if (!target) {
			throw new Error('Service not found: \''+this._containerName+':'+name+'\'');
		}
		if (!target.instance) {
			const args: any[] = target.options && target.options.args ? target.options.args : [];
			target.instance = new (target.clazz)(...args);
			target[App.SERVICE_NAME_PROPERTY] = name;
		}
		return target.instance;
	}
	
	public getsByTag<T>(tagName: string): T[] {
		if (!this._taggedServices[tagName]) {
			this._taggedServices[tagName] = Object.keys(this._container)
				.filter(name => {
					const service: ContainerValue = this._container[name];
					return service.options && service.options.tags && service.options.tags.indexOf(tagName) !== -1;
				})
				.map(name => this.get<T>(name))
			;
		}
		return this._taggedServices[tagName];
	}
	
	
}