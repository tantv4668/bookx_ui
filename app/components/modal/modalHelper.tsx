"use client";
import { FC, useContext, useEffect } from "react";
import type { ModalArgs, ModalHocProps } from "./types";
import { useModal } from "./useModal";
import {
  ALREADY_MOUNTED,
  modalActions,
  ModalContext,
  ModalIdContext,
} from "./modalContext";

type ModalRegistry = {
  comp: React.FC<any>;
  props?: Record<string, unknown>;
};

export const MODAL_REGISTRY = new Map<string, ModalRegistry>();

export const create = <P extends {}>(
  Comp: React.ComponentType<P>
): FC<P & ModalHocProps> => {
  // return higher order component
  return ({ id, defaultVisible, keepMounted, ...props }) => {
    const { args, show } = useModal(id);

    const modals = useContext(ModalContext);
    const shouldMount = !!modals[id];

    useEffect(() => {
      if (defaultVisible) {
        show();
      }

      ALREADY_MOUNTED[id] = true;

      return () => {
        // if(!keepMounted){
        delete ALREADY_MOUNTED[id];
        // }
      };
    }, [id, show, defaultVisible]);

    useEffect(() => {
      if (keepMounted) modalActions.setStates(id, { keepMounted: true });
    }, [id, keepMounted]);

    const delayVisible = modals[id]?.delayVisible;

    useEffect(() => {
      if (delayVisible) {
        show(args);
      }
    }, [delayVisible, args, show]);

    if (!shouldMount) return null;

    return (
      <ModalIdContext.Provider value={id}>
        <Comp {...(props as unknown as P)} {...args} />
      </ModalIdContext.Provider>
    );
  };
};

export const register = <T extends React.FC<any>>(
  id: string,
  comp: T,
  props?: Partial<ModalArgs<T>>
): void => {
  if (!MODAL_REGISTRY.has(id)) {
    MODAL_REGISTRY.set(id, { comp, props });
  } else {
    MODAL_REGISTRY.set(id, { comp: MODAL_REGISTRY.get(id)!.comp!, props });
  }
};

export const unregister = (id: string): void => {
  MODAL_REGISTRY.delete(id);
};
