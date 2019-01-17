import {App} from '../App';

export function Tags(containerName: string = App.DEFAULT_CONTAINER_NAME, tagName: string = null) {
	
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