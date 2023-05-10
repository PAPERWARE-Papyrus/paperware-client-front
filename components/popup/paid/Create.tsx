import { Api } from "@/@shared";
import { Enum } from "@/@shared/models";
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
  const [form] = useForm<Api.PaidByCashCreateRequest | Api.PaidByEtcCreateRequest>();

  const apiByCash = ApiHook.Partner.ByCash.useByCashPaidCreate();
  const apiByEtc = ApiHook.Partner.ByEtc.useByEtcPaidCreate();
  const cmd = useCallback(
    async (values: Api.PaidByCashCreateRequest | Api.PaidByEtcCreateRequest) => {
      const method: Enum.Method = form.getFieldValue("accountedMethod");
      values.partnerNickName = '';

      switch (method) {
        case 'ACCOUNT_TRANSFER':
          // TODO
          break;
        case 'CARD_PAYMENT':
          // TODO
          break;
        case 'PROMISSORY_NOTE':
          // TODO
          break;
        case 'SET_OFF':
          // TODO
          break;
        case 'CASH':
          await apiByCash.mutateAsync({ data: values });
          break;
        case 'ETC':
          await apiByEtc.mutateAsync({ data: values });
          break;
      }

      form.resetFields();
      props.onClose(false);
    },
    [apiByCash, apiByEtc, form, props]
  );

  return (
    <Popup.Template.Property title="지급 등록" {...props}>
      <div className="flex-1 p-4">
        <FormCreate
          form={form}
          onFinish={async (values) => await cmd(values)}
        />
      </div>
    </Popup.Template.Property>
  );
}
