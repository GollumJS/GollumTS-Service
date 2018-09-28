import {ObjectString} from 'gollumts-objecttype';

interface ContainerValue {
	clazz: any;
	instance: any;
}

export abstract class App {
	
	public static DEFAULT_CONTAINER_NAME = 'default';
	
	private static _instances: ObjectString<App> = {};
	
	public static getInstance(name: string = App.DEFAULT_CONTAINER_NAME): App {
		return this._instances[name];
	}
	
	private _container: { [name: string]: ContainerValue } = {};
	private _containerName: string;
	
	public constructor (name: string = App.DEFAULT_CONTAINER_NAME) {
		this._containerName = name;
		App._instances[name] = this;
		this.set('app', this);
	}
	
	public set(name: string, value: any): void {
		name = name.toLowerCase();
		this._container[name] = {
			clazz: value.constructor,
			instance: value,
		}
	}
	
	public has(name: string): boolean {
		name = name.toLowerCase();
		return !!this._container[name];
	}
	
	public declare(name: string, clazz: any): void {
		name = name.toLowerCase();
		this._container[name] = {
			clazz: clazz,
			instance: null,
		}
	}
	
	public get<T>(name): T {
		name = name.toLowerCase();
		if (!this._container[name]) {
			throw new Error('Service not found: \''+this._containerName+':'+name+'\'');
		}
		if (!this._container[name].instance) {
			this._container[name].instance = new (this._container[name].clazz)();
		}
		return this._container[name].instance;
	}
	
	
}