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

export default function SignInPage() {
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
      <Button type="submit" className="w-full">
        로그인
      </Button>
      <Text>
        아직 아이디가 없다면?{" "}
        <TextLink href="/sign-up">
          <Strong>회원가입하기</Strong>
        </TextLink>
      </Text>
    </form>
  );
}
