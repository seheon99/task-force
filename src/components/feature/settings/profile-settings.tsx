import {
  Button,
  Divider,
  Field,
  FieldGroup,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Text,
} from "@/components/base";

export function ProfileSettings() {
  return (
    <div className="flex flex-col gap-y-16">
      <form>
        <Fieldset className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-3 md:gap-y-10">
          <div>
            <Legend>개인 정보</Legend>
            <Text>
              개인정보보호법 위반 시 5년 이하의 징역 또는 5천만원 이하의 벌금.
            </Text>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <Field className="sm:col-span-3">
              <Label>계급</Label>
              <Select>
                <option value="이병">이병</option>
                <option value="일병">일병</option>
                <option value="상병">상병</option>
                <option value="병장">병장</option>
              </Select>
            </Field>
            <Field className="sm:col-span-3">
              <Label>이름</Label>
              <Input />
            </Field>
            <Field className="sm:col-span-3">
              <Label>입대일</Label>
              <Input type="date" />
            </Field>
            <Field className="sm:col-span-3">
              <Label>생일</Label>
              <Input type="date" />
            </Field>
            <Button type="submit">저장</Button>
          </FieldGroup>
        </Fieldset>
      </form>
      <Divider />
      <form>
        <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
          <div>
            <Legend>비밀번호 변경</Legend>
            <Text>쉽게 추측할 수 없는 비밀번호를 사용해주세요.</Text>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <Field className="col-span-full">
              <Label>현재 비밀번호</Label>
              <Input type="password" />
            </Field>
            <Field className="col-span-full">
              <Label>새 비밀번호</Label>
              <Input type="password" />
            </Field>
            <Field className="col-span-full">
              <Label>새 비밀번호 확인</Label>
              <Input type="password" />
            </Field>
            <Button type="submit">저장</Button>
          </FieldGroup>
        </Fieldset>
      </form>
      <Divider />
      <form>
        <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-y-10">
          <div>
            <Legend>계정 삭제</Legend>
            <Text>모든 정보는 즉시 삭제되며 되돌릴 수 없습니다.</Text>
          </div>
          <FieldGroup className="grid grid-cols-1 gap-x-6 sm:max-w-xl sm:grid-cols-6 md:col-span-2">
            <Button type="submit" color="red" className="md:col-span-3">
              계정 삭제하기
            </Button>
          </FieldGroup>
        </Fieldset>
      </form>
    </div>
  );
}
