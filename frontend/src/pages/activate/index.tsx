import Botton from '@/components/Buttom';
import Layout from '@/hocs/Layout';
import { ReactElement } from 'react';
import { useState } from 'react';
import { UnknownAction } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { useSearchParams } from 'next/navigation';
import { ToastError } from '@/components/toast/toast';
import { IActivationsProps } from '@/redux/actions/auth/interfaces';
import { activate } from '@/redux/actions/auth/actions';

export default function Page() {
  const searchParams = useSearchParams();

  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token === '' || uid === '') {
      ToastError('Token and UID must be provided');
      return;
    }

    const activationData: IActivationsProps = {
      uid,
      token,
    };

    try {
      setLoading(true);
      await dispatch(activate(activationData));
    } catch (err) {
      ToastError(`${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Activa tu cuenta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleOnSubmit} className="space-y-2">
          <Botton disabled={loading} hoverEffect={!loading} type="submit">
            {loading ? <LoadingMoon /> : 'Activate'}
          </Botton>
        </form>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
