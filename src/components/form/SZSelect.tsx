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
    <div className="form-control">
      <label className="label">
        <span className="label-text text-xl font-medium text-success">
          {label}
        </span>
      </label>
      <select
        {...register(name)}
        className={`select text-info w-full select-bordered ${
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
