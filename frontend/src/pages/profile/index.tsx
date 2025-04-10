import Layout from '@/hocs/Layout';
import { ReactElement, useEffect, useState } from 'react';

import { Field, Label, Switch } from '@headlessui/react';
import Container from '@/components/pages/profile/Container';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/reducers';
import EditText from '@/components/forms/EditText';
import { IUser } from '@/interfaces/auth/IUser';
import { UnknownAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ToastError, ToastSuccess, ToastWarning } from '@/components/toast/toast';
import { loadProfile, loadUser } from '@/redux/actions/auth/actions';
import Button from '@/components/Buttom';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import EditDate from '@/components/forms/EditDate';
import EditURL from '@/components/forms/EditURLS';
import validator from 'validator';
export default function Page() {
  const user = useSelector((state: RootState) => state.auth.user);
  const profile = useSelector((state: RootState) => state.auth.profile);

  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [hasChangesProfile, setHasChangesProfile] = useState<boolean>(false);

  const [username, setUsername] = useState<string>('');
  const [Firstname, setFirstName] = useState<string>('');
  const [Lastname, setLastName] = useState<string>('');

  const [birthday, setBirthday] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [linkedin, setLinkedin] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [tiktok, setTiktok] = useState<string>('');
  const [snapchat, setSnapchat] = useState<string>('');

  //rellenar el estado con estados
  useEffect(() => {
    if (user) {
      setUsername(user?.username);
      setFirstName(user?.first_name);
      setLastName(user?.last_name);
    }

    if (profile) {
      setBirthday(profile?.birthday);
      setWebsite(profile?.website);
      setTwitter(profile?.twitter);
      setInstagram(profile?.instagram);
      setGithub(profile?.github);
      setLinkedin(profile?.linkedin);
      setYoutube(profile?.youtube);
      setTiktok(profile?.tiktok);
      setSnapchat(profile?.snapchat);
    }
  }, [user, profile]);

  const isValidDate=(data: string)=>{!Number.isNaN(new Date(data).getTime())}
  const isValidUrl = (url: string) => validator.isURL(url, { require_protocol: false });
  useEffect(() => {
    if (
      username !== user?.username ||
      Firstname !== user?.first_name ||
      Lastname !== user?.last_name
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }

    if (
      (birthday !== profile?.birthday && isValidDate(birthday)) ||
      (website !== profile?.website && isValidUrl(website)) ||
      (twitter !== profile?.twitter && isValidUrl(twitter)) ||
      (instagram !== profile?.instagram && isValidUrl(instagram)) ||
      (github !== profile?.github && isValidUrl(github)) ||
      (linkedin !== profile?.linkedin && isValidUrl(linkedin)) ||
      (youtube !== profile?.youtube && isValidUrl(youtube)) ||
      (tiktok !== profile?.tiktok && isValidUrl(tiktok)) ||
      (snapchat !== profile?.snapchat && isValidUrl(snapchat))
    ) {
      setHasChangesProfile(true);
    } else {
      setHasChangesProfile(false);
    }
  }, [
    user,
    username,
    Firstname,
    Lastname,
    birthday,
    website,
    twitter,
    instagram,
    github,
    linkedin,
    youtube,
    tiktok,
    snapchat,
  ]);

  const dispatch: ThunkDispatch<any, any, UnknownAction> = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handleSaveUserData = async () => {
    const updatedData: Record<string, string> = {};
    if (username !== user?.username) {
      updatedData.username = username;
    }
    if (Firstname !== user?.first_name) {
      updatedData.first_name = Firstname;
    }
    if (Lastname !== user?.last_name) {
      updatedData.last_name = Lastname;
    }

    if (Object.keys(updatedData).length === 0) {
      ToastWarning('No changes made to user data.');
      return;
    }

    try {
      const response = await fetch('/user/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        ToastSuccess('User data updated successfully.');
        await dispatch(loadUser());
      } else {
        ToastError('Failed to update user data.');
      }
    } catch (error) {
      ToastError('An error occurred while updating user data.');
    }
  };
  const handleProfileData = async () => {
    const updatedData: Record<string, string> = {};
    if (birthday !== profile?.birthday) {
      updatedData.birthday = birthday;
    }
    if (website !== profile?.website) {
      updatedData.website = website;
    }
    if (twitter !== profile?.twitter) {
      updatedData.twitter = twitter;
    }
    if (instagram !== profile?.instagram) {
      updatedData.instagram = instagram;
    }
    if (github !== profile?.github) {
      updatedData.github = github;
    }
    if (linkedin !== profile?.linkedin) {
      updatedData.linkedin = linkedin;
    }
    if (youtube !== profile?.youtube) {
      updatedData.youtube = youtube;
    }
    if (tiktok !== profile?.tiktok) {
      updatedData.tiktok = tiktok;
    }
    if (snapchat !== profile?.snapchat) {
      updatedData.snapchat = snapchat;
    }

    if (Object.keys(updatedData).length === 0) {
      ToastWarning('No changes made to profile data.');
      return;
    }

    try {
      const response = await fetch('/profile/update', {
        // Assuming a different endpoint for profile updates
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        ToastSuccess('Profile data updated successfully.');
        await dispatch(loadProfile());
      } else {
        ToastError('Failed to update Profile data.');
      }
    } catch (error) {
      ToastError('An error occurred while updating profile data.');
    }
  };
  const handleSaveData = async () => {
    if (!hasChanges && !hasChangesProfile) {
      ToastWarning('No changes made.');
      return;
    }
    try {
      setLoading(true);

      if (hasChanges) {
        await handleSaveUserData();
      }

      if (hasChangesProfile) {
        await handleProfileData();
      }
      ToastSuccess('User data saved successfully.');
    } catch (error) {
      ToastError('An error occurred while saving data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        <div className=" ">
          <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="text-base font-semibold text-gray-900">User Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be in this profile and will be visible to the public.
              </p>
            </div>
            <div className="ml-4 mt-4 shrink-0">
              <Button
                onClick={handleSaveData}
                disabled={loading || (!hasChanges && !hasChangesProfile)}
                hoverEffect
              >
                {loading ? <LoadingMoon /> : 'save changes'}
              </Button>
            </div>
          </div>
        </div>

        <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditText data={username} setData={setUsername} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">First Name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditText data={Firstname} setData={setFirstName} />
            </dd>
          </div>
          <div className="pt-6 sm:flex">
            <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Last Name</dt>
            <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditText data={Lastname} setData={setLastName} />
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
        <p className="mt-1 text-sm/6 text-gray-500">
          Your public profile information to let the world know more about you.
        </p>

        <ul className="mt-6 divide-y divide-gray-100 border-t border-gray-200 text-sm/6">
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Birthday</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditDate useTime={false} data={birthday} setData={setBirthday} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Website</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={website} setData={setWebsite} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Instagram</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={instagram} setData={setInstagram} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Facebook</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={twitter} setData={setTwitter} />
            </div>
          </li>

          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">LinkedIn</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={linkedin} setData={setLinkedin} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">YouTube</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={youtube} setData={setYoutube} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">TikTok</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={tiktok} setData={setTiktok} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Github</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={github} setData={setGithub} />
            </div>
          </li>
          <li className="py-6 sm:flex">
            <h4 className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Snapchat</h4>
            <div className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
              <EditURL data={snapchat} setData={setSnapchat} />
            </div>
          </li>
        </ul>
      </div>
    </Container>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
