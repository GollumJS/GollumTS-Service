export function Tagged(tagName: string) {
	return function(target: any, propertyKey: string = null, descriptor: PropertyDescriptor = null) {
		if (!target.__gollumts_service_tagged__) {
			target.__gollumts_service_tagged__ = [];
		}
		if (target.__gollumts_service_tagged__.indexOf(tagName) === -1) {
			target.__gollumts_service_tagged__.push(tagName)
		}
	}
	
}