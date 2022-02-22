import { addAttributes, createAttrs } from "./characterSlice";

test("addAttributes adds attributes", () => {
  expect(
    addAttributes(createAttrs({ hearts: 1 }), createAttrs({ hearts: 3 }))
  ).toStrictEqual(createAttrs({ hearts: 4 }));
});
