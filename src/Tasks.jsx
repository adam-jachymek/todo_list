import { useQuery, useMutation } from "react-query"
import { fetchTasks, addTask, deleteTask, updateTask
 } from "./api/requests"
import Header from "./Header"
import { Checkbox, Button, TextInput, InputWrapper } from '@mantine/core';
import { useFormik } from "formik";
import * as Yup from 'yup';

import './tasks.sass'
import classNames from "classnames";

const Tasks = () => {
const { isLoading, data, refetch } = useQuery(["fetchTasks"], fetchTasks)

const { mutate: addItem } = useMutation(addTask, {
  onSuccess: (response) => {
    refetch()
  },
});

const TaskSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'too short! (min 5 characters)')
    .max(50, 'too long! (max 50 characters)')
    .required('required'),
  description: Yup.string()
    .min(5, 'too short! (min 5 characters)')
    .max(50, 'too long! (max 50 characters)')
    .required('required'),
});

const formik = useFormik({
  initialValues: {
    name: '',
    description: '',
  },
  validationSchema: TaskSchema,
  onSubmit: (values, { resetForm }) => {
    addItem(values)
    resetForm()
  },
},);

const { mutate: updateItem } = useMutation(updateTask, {
  onSuccess: (response) => {
    refetch()
  },
});

const { mutate: deleteItem } = useMutation(deleteTask, {
  onSuccess: (response) => {
    refetch()
  },
});

const handleComplete = (values) => {
  updateItem(values)
}

const handleDelete = (id) => {
    deleteItem(id)
}

const tasks = data?.map((task) => (
  <li className="tasks__task" key={task.id}>
    <div className="tasks__header">
      <div className="tasks__name">{task.name}</div>
      <div className="tasks__desc">{task.description}</div>
    </div>
    <Checkbox
      className="tasks__completed"
      checked={task.completed}
      onChange={(e) =>
        handleComplete({...task, completed: e.target.checked})}
    />
    <Button className="tasks__delete" onClick={() => handleDelete(task.id)}>Delete</Button>
  </li>
))

console.log(formik.touched, formik.errors, formik.values)
  return (
    <>
    <Header />
    <div className="wrapper">
      <form onSubmit={formik.handleSubmit}>
        <h3 className="wrapper__title">Tasks</h3>
        <InputWrapper className="form">
          <TextInput
            classNames={{
              root: "form__input",
              input: classNames({"form__error": formik.errors.name && formik.touched.name}),
              label: classNames({"form__label-error": formik.errors.name && formik.touched.name})
            }}
            label={formik.errors.name && formik.touched.name ? (
              "Name " + formik.errors.name
            ) : "Name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          <TextInput
            classNames={{
              root: "form__input",
              input: classNames({"form__error": formik.errors.description && formik.touched.description}),
              label: classNames({"form__label-error": formik.errors.description && formik.touched.description})
            }}
            label={formik.errors.description && formik.touched.description ? (
              "Description " + formik.errors.description
            ) : "Description"}
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
          />
        <Button className="form__submit" type="submit">Add</Button>
        </InputWrapper>
      </form>
      {!isLoading && <div className="tasks">
        <ul className="tasks__list">
          {tasks}
        </ul>
      </div>}
    </div>
    </>
  )
}

export default Tasks
