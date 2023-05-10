import { FormControl } from "@/components";
import { Form } from "antd";
import { useSetRecoilState } from "recoil";
import { accountedAtom } from "./accounted.state";
import { Model } from "@/@shared";

type NamePath = 'partnerId' | 'accountedFromDate' | 'accountedToDate' | 'accountedSubject' | 'accountedMethod';

export default function Component() {
  const setPiadCondtiuon = useSetRecoilState(accountedAtom);

  const onChange = (name: NamePath, value: string | number) => {
    switch (name) {
      case 'partnerId':
        setPiadCondtiuon((prev) => ({
          ...prev,
          partnerId: value as number
        }));
        break;
      case 'accountedFromDate':
        setPiadCondtiuon((prev) => ({
          ...prev,
          accountedFromDate: value as string
        }));
        break;
      case 'accountedToDate':
        setPiadCondtiuon((prev) => ({
          ...prev,
          accountedToDate: value as string
        }));
        break;
      case 'accountedSubject':
        setPiadCondtiuon((prev) => ({
          ...prev,
          accountedSubject: value as Model.Enum.Subject
        }));
        break;
      case 'accountedMethod':
        setPiadCondtiuon((prev) => ({
          ...prev,
          accountedMethod: value as Model.Enum.Method
        }));
        break;
    }
  }

  return (
    <div
      className={
        "p-6 rounded-lg basis-3/5 flex-grow-0 flex flex-row justify-center border border-solid border-gray-200 select-none bg-white shadow-sm"
      }
    >
      <Form
        layout={"vertical"}
        className={"flex flex-row gap-4 w-full"}>
        <Form.Item name="partnerId" label="거래처" className={"w-1/5"} getValueFromEvent={(value) => onChange('partnerId', value)}>
          <FormControl.SelectPartner />
        </Form.Item>
        <Form.Item name="accountedFromDate" label="수금일" className={"w-1/5"} getValueFromEvent={(value) => onChange('accountedFromDate', value)}>
          <FormControl.DatePicker value={new Date().toISOString()} />
        </Form.Item>
        <div className={"mt-8"}>
          ~
        </div>
        <Form.Item name="accountedToDate" label=" " className={"w-1/5 mt-30"} getValueFromEvent={(value) => onChange('accountedToDate', value)}>
          <FormControl.DatePicker value={new Date().toISOString()} />
        </Form.Item>
        <Form.Item name="accountedSubject" label="계정 과목" className={"w-1/5"} getValueFromEvent={(value) => onChange('accountedSubject', value)}>
          <FormControl.SelectPaidSubject />
        </Form.Item>
        <Form.Item name="accountedMethod" label="지급 수단" className={"w-1/5"} getValueFromEvent={(value) => onChange('accountedMethod', value)}>
          <FormControl.SelectMethod />
        </Form.Item>
      </Form>
    </div>
  );
}
