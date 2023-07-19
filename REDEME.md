# Throttle Decorators
## How to use？

```typescript
import { throttle } from "./Throttle.ts";
@throttle(2000,callbackfunc)
function clickMe(){
  ...
}
