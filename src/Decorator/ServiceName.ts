import {App} from '../App';

export function ServiceName() {
	return function(target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) {
		Object.defineProperty(target, propertyKey, {
			get: function () {
				return this[App.SERVICE_NAME_PROPERTY];
			}
		});
	}	
}