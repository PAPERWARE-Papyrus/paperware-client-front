import { Model } from "@/@shared";
import { Util } from "@/common";
import { Select } from "antd";

export const ENDORSEMENT_TYPE_OPTIONS = [
  {
    label: "선택안함",
    value: "NONE" as Model.Enum.EndorsementType,
  },
  {
    label: "자수",
    value: "SELF_NOTE" as Model.Enum.EndorsementType,
  },
  {
    label: "타수",
    value: "OTHERS_NOTE" as Model.Enum.EndorsementType,
  },
];

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

export default function Component(props: Props) {
  return (
    <div className="flex flex-col gap-y-1">
      <Select
        value={Util.endorsementTypeToString(props.value) as unknown as number}
        onChange={props.onChange}
        placeholder="배서 목록"
        options={ENDORSEMENT_TYPE_OPTIONS}
      />
    </div>
  );
}
