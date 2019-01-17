import {App} from '../App';

export function Tag(tagName: string = null, containerName: string = App.DEFAULT_CONTAINER_NAME) {
	
	return function(target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) {
		
		tagName = tagName ? tagName : propertyKey;
		tagName = tagName[0] == '_' ? tagName.substr(1) : tagName;
		
		Object.defineProperty(target, propertyKey, {
			get: function () {
				return App.getInstance(containerName).getsByTag(tagName);
			}
		});
	}
	
}