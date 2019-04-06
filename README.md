# GollumTS-Service

An implementaion of service injector and manager.

## Install:

```
npm install --save gollumts-service
```

## Example 

```typescript
	
	import { App, Service, ServiceName, Tags, Tagged } from 'gollumts-service';
	
	class Service1 {
		
		@ServiceName();
		public serviceName: string;
		
		@Service()
		private _nameOfService2: Service2;
		
		display(): void {
			this._nameOfService2.display();
		}
		
	}
	
	class Service2 {
		
		@Service('nameOfService3')
		private _serviceReplaceName: Service3;
		
		display(): void {
			this._serviceReplaceName.display();
		}
		
	}
	
	@Tagged('autoTag') // 'Add automaticly a tag on this class'
	class Service3 {
		
		private _text: string;
		
		public constructor(text: string) {
			this._text = text;
		}
		
		display(): void {
			console.log(this._text);
		}
		
	}
	
	class Main extends App {
		
		@Service()
		private _nameOfService1: Service1;
		
		@Tag()
		private _tags1: any[];
		
		@Tag('tag2')
		private _tags2CustomName: any[];
		
		@Tag()
		private _autoTag: any[];
		
		start(): void {
			
			this.declare('nameOfService1', Service1);
			this.declare('nameOfService2', Service2);
			this.set('nameOfService3', new Service3('Hello World'));
			this.declare('nameOfService3WithParams', Service3, { args: ['Hello World'] });
			
			this.declare('taggedService1', Service1, { tags: [ 'tags1' ] });
			this.declare('taggedService2', Service2, { tags: [ 'tags1', 'tag2' ] });
			
			this._nameOfService1.display();
			
			this._tags1[0].display(); // Hello World
			
			console.log(this._nameOfService1.serviceName); // nameofservice1
			
		}
		
	}
	
	// Start run
	
	const main = new main();
	main.start();
	
```
