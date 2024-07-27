//? В цьому файлі будуть зареєстровані дії, які змінюють стан
import { createFeature, createReducer, on } from '@ngrx/store';
import authActions from './auth.actions';
import { AuthStateInterface } from '../interfaces/auth-state.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
};

//? обгортка над reducer куди передається сам reducer (і одночасно створюється) і його назва
const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({ ...state, isSubmitting: true }))
    //? метод on() асоціює передану дію з коллбеком, який передається останнім аргументом і який відповідальний за зміну стану
  ),
});

export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting } = authFeature;
//? селектор selectIsSubmitting надається нам "з коробки" методом createFeature()