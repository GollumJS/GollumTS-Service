# GollumTS-Service

An implementaion of service injector and manager.

## Install:

```
npm install --save gollumts-service
```

## Example 

```typescript
	
	import { Service, App } from 'gollumts-service';
	
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
	
	class Service2 {
		
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
		
		start(): void {
			
			this.declare('nameOfService1', Service1);
			this.declare('nameOfService2', Service2);
			this.set('nameOfService3', Service3('Hello World'));
			
			this._nameOfService1.display();
			
		}
		
	}
	
	// Start run
	
	const main = new main();
	main.start();
	
```