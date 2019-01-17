# GollumTS-Service

An implementaion of service injector and manager.

## Install:

```
npm install --save gollumts-service
```

## Example 

```typescript
	
	import { App, Service, Tags } from 'gollumts-service';
	
	class Service1 {
		
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
		
		start(): void {
			
			this.declare('nameOfService1', Service1);
			this.declare('nameOfService2', Service2);
			this.set('nameOfService3', new Service3('Hello World'));
			this.declare('nameOfService3WithParams', Service3, { args: ['Hello World'] });
			
			this.declare('taggedService1', Service1, { tags: [ 'tags1' ] });
			this.declare('taggedService2', Service2, { tags: [ 'tags1', 'tag2' ] });
			
			this._nameOfService1.display();
			
			this._tags1[0].display();
			
		}
		
	}
	
	// Start run
	
	const main = new main();
	main.start();
	
```
