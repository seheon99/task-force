import { CogIcon } from "@heroicons/react/16/solid";

import { twcn } from "@/utilities";

export function Loading({className}:{className?:string}) {
  return <CogIcon className={twcn("size-6 animate-spin",className)} />;
}
