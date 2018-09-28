import {App} from '../App';

export function Service(containerName: string = App.DEFAULT_CONTAINER_NAME, name: string = null) {
	
	return function(target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) {
		
		name = name ? name : propertyKey;
		name = name[0] == '_' ? name.substr(1) : name;
		
		Object.defineProperty(target, propertyKey, {
			get: function () {
				return App.getInstance(containerName).get(name);
			}
		});
	}
	
}