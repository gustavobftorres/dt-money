import * as Dialog from "@radix-ui/react-dialog";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { FormEvent, useContext, useState } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext";

interface NewTransactionModalProps {
  onRequestClose?: () => void;
}

export function NewTransactionModal({ onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useContext(TransactionsContext);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "outcome">("income");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (price === "") return;

    createTransaction({
      description,
      price: Number(price),
      category,
      type,
    });

    setDescription("");
    setPrice("");
    setCategory("");
    setType("income");

    onRequestClose?.();
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Descrição"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <TransactionType value={type} onValueChange={(v) => setType(v as "income" | "outcome")}>
            <TransactionTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} />
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit">Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}