import { Api } from "@/@shared";
import { ApiHook } from "@/common";
import { Popup } from "@/components";
import { useForm } from "antd/lib/form/Form";
import { useCallback } from "react";
import { FormCreate } from "./common";

export interface Props {
  open: boolean;
  onClose: (unit: boolean) => void;
}

export default function Component(props: Props) {
  const [form] = useForm<Api.CardCreateRequest>();

  const apiCard = ApiHook.Inhouse.Card.useCardCreate();

  const cmd = useCallback(
    async (values: Api.CardCreateRequest) => {

      await apiCard.mutateAsync({ data: values });

      form.resetFields();
      props.onClose(false);
    },
    [apiCard, form, props]
  );

  return (
    <Popup.Template.Property title={`카드 등록`} {...props}>
      <div className="flex-1 p-4">
        <FormCreate
          form={form}
          onFinish={async (values) => await cmd(values)}
        />
      </div>
    </Popup.Template.Property>
  );
}