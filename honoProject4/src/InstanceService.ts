import InstanceError from "./utils/errors/InstanceError";

class InstanceService {
  private static instances: Map<string, any> = new Map();

  public static set<T>(interfaceName:string,instance: T): void {
    try {
        const instance = this.instances.get(interfaceName);
        if (instance) {
            throw new InstanceError(
                "Instance Already Exists",
                400,
                "InstanceService.set",
                { instanceName: interfaceName }
            );
        }
        this.instances.set(interfaceName,instance);
        console.log(`InstanceService.set: ${interfaceName}`);
        
    } catch (error) {
      throw new InstanceError(
        "Instance Registration Error",
        500,
        "InstanceService.set",
        { error }
      );
    }
  }

  public static get<T>(interfaceName:string): T {
    try {
        const instance = this.instances.get(interfaceName);
        if (instance) return instance as T;
        throw new InstanceError(
            "Instance Undefined Error",
            500,
            "InstanceService.get",
            { instanceName: interfaceName }
        )
    } catch (error) {
      throw new InstanceError(
        "Instance Get Error",
        500,
        "InstanceService.get",
        { error }
      );
    }
  }
}

export default InstanceService;
