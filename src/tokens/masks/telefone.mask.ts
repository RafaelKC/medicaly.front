export const TELEFONE_MASK = {
  mask: [
    {
      mask: '(00) 0000-0000',
      startsWith: '1',
      maxLength: 10
    },
    {
      mask: '(00) 00000-0000',
      startsWith: '2',
      maxLength: 11
    }
  ],
  lazy: false
};
