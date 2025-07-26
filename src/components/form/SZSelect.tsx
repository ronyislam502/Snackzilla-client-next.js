import { IInput } from "@/types/global";
import { useFormContext, useWatch } from "react-hook-form";

interface IProps extends IInput {
  options: {
    key: string;
    label: string;
  }[];
}

const SZSelect = ({ name, label, options }: IProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const currentValue = useWatch({ name });

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-white text-xl">{label}</span>
      </label>
      <select
        {...register(name)}
        className={`select text-white bg-black/50 select-bordered w-full ${
          errors[name] ? "select-error" : "select-success"
        }`}
        value={currentValue || ""}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default SZSelect;
