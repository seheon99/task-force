import {
  Button,
  Field,
  Heading,
  Input,
  Label,
  Strong,
  Text,
  TextLink,
} from "@/components/base";

export default function SignUpPage() {
  return (
    <form
      action="#"
      method="POST"
      className="grid w-full max-w-sm grid-cols-1 gap-8"
    >
      <Heading>로그인</Heading>
      <Field>
        <Label>군번</Label>
        <Input type="email" name="email" />
      </Field>
      <Field>
        <Label>비밀번호</Label>
        <Input type="password" name="password" />
      </Field>
      <Field>
        <Label>비밀번호 확인</Label>
        <Input type="password" name="passwordConfirm" />
      </Field>
      <Field>
        <Label>입대일</Label>
        <Input type="date" name="enlistedAt" />
      </Field>
      <Field>
        <Label>전역일</Label>
        <Input type="date" name="secededAt" />
      </Field>
      <Button type="submit" className="w-full">
        회원가입
      </Button>
      <Text>
        아이디가 있다면?{" "}
        <TextLink href="/sign-in">
          <Strong>로그인하기</Strong>
        </TextLink>
      </Text>
    </form>
  );
}
