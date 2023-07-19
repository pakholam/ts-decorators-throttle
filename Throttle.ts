export type CallbackFunction = (...args: any[]) => void;

export type MethodDecorators = (
  target: object,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor
) => PropertyDescriptor;

/**
 * 函数节流
 * @exports
 * @param {number} interval 时间间隔（毫秒）
 * @param {CallbackFunction} callback 回调函数
 * @returns {MethodDecorators}
 */
export function throttle(interval: number, callback?: CallbackFunction): MethodDecorators {
  return (target: object, propertyName: string, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
    const method: (...args: any) => any = propertyDescriptor.value;
    let previous: number = 0;
    propertyDescriptor.value = function (...args: any[]): any {
      let now: number = Date.now();
      if (now - previous <= interval) {
        console.log(`[throttle] ${target.constructor.name}.${propertyName} call frequently.`);
        if (callback) callback();
        return;
      }

      method.apply(this, args);
      previous = now;
    };
    return propertyDescriptor;
  };
}
