import {
  Description,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
  SwitchField,
  Text,
} from "@/components/base";

import { PushNotificationSwitch } from "./push-notification-switch";

export function PreferenceSettings() {
  return (
    <div className="flex flex-col gap-y-16">
      <form>
        <Fieldset className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3 md:gap-y-10">
          <div>
            <Legend>알림 설정</Legend>
            <Text>받고싶은 일부 알림만 선택할 수도 있습니다</Text>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <SwitchField className="sm:col-span-3">
              <Label>푸시 알림</Label>
              <Description>
                푸시 알림을 설정하고 뽑기 결과를 바로 확인해보세요
              </Description>
              <PushNotificationSwitch />
            </SwitchField>
          </FieldGroup>
        </Fieldset>
      </form>
    </div>
  );
}
