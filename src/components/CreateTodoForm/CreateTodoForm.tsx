import { Label } from "../Label";
import { Select } from "../Select";
import { inputCn } from "./constants";
import { useCustomizables, useTodos } from "../../context";
import { useForm } from "react-hook-form";
import { SectionTitle } from "../SectionTitle";
import { ChangeEventHandler, useEffect } from "react";
import { AvailableFields, CreateTodoFormData } from "./types";

export const CreateTodoForm = () => {
  const { addTodo } = useTodos();
  const { status: allStatus, priorities: allPriorities } = useCustomizables();
  const statusDefault = allStatus?.[0]?.id ?? "";
  const priorityDefault = allPriorities?.[0]?.id ?? "";

  const {
    reset,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      priority: priorityDefault,
      status: statusDefault,
    },
  });

  const onSubmit = (formData: CreateTodoFormData) => {
    const { status, priority, ...strFields } = formData;
    const matchStatus = allStatus?.find((s) => s.id === status);
    const matchPriority = allPriorities?.find((p) => p.id === priority);

    if (!matchStatus || !matchPriority) {
      console.error("Status or priority not found", {
        status: formData.status,
        priority: formData.priority,
      });
      return;
    }

    addTodo({
      ...strFields,
      status: matchStatus,
      priority: matchPriority,
    });
    reset();
  };

  const buildOnChange =
    (name: AvailableFields): ChangeEventHandler<HTMLSelectElement> =>
    (event) =>
      setValue(name, event.target.value);

  useEffect(() => {
    setValue("priority", priorityDefault);
    setValue("status", statusDefault);
  }, [priorityDefault, setValue, statusDefault]);

  return (
    <>
      <SectionTitle>Agregá una nueva tarea</SectionTitle>
      <form
        className="flex flex-col gap-6 mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label name="Título" hasError={Boolean(errors.name)} isRequired>
          <input
            type="text"
            className={inputCn}
            {...register("name", { required: true })}
          />
        </Label>
        <Select
          isRequired
          label="Prioridad"
          className={inputCn}
          options={allPriorities}
          isLoading={!allPriorities}
          onChange={buildOnChange("priority")}
        />
        <Select
          isRequired
          label="Estado"
          options={allStatus}
          className={inputCn}
          isLoading={!allStatus}
          onChange={buildOnChange("status")}
        />
        <Label name="Descripción">
          <textarea className={inputCn} {...register("description")} />
        </Label>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
        >
          Crear
        </button>
      </form>
    </>
  );
};
