const messages = {
  required: 'Поле обязательно для заполнения',
}

export default () => {
  const required = (msg = messages.required) => (val: any) => !!val || msg;

  return {
    required
  }
}
