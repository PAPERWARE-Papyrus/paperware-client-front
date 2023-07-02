import { Api } from "@/@shared";
import { ApiHook } from "@/common";
import { Popup } from "@/components";
import { useForm } from "antd/lib/form/Form";
import { useCallback, useEffect } from "react";
import { FormCreate } from "./common";

export interface Props {
  open: boolean;
  onClose: (unit: boolean) => void;
}

export default function Component(props: Props) {
  const [form] = useForm<Api.WarehouseCreateRequest>();

  const api = ApiHook.Inhouse.Warehouse.useCreate();
  const cmd = useCallback(
    async (values: Api.WarehouseCreateRequest) => {
      await api.mutateAsync({ data: values });
      form.resetFields();
      props.onClose(false);
    },
    [api, form, props]
  );

  useEffect(() => {
    if (!props.open) {
      return;
    }

    form.resetFields();
  }, [form, props.open]);

  return (
    <Popup.Template.Property title="창고 추가" {...props}>
      <div className="flex-1 p-4">
        <FormCreate
          form={form}
          onFinish={async (values) => await cmd(values)}
        />
      </div>
    </Popup.Template.Property>
  );
}
