import { createSignal, createResource, JSX } from 'solid-js';
import axios from 'axios';

const fetchUser = async (id: number) =>
  (
    await axios.get(
      `${import.meta.env.VITE_API_BASE_URL || ''}/api/people/${id}/`,
    )
  ).data;

export const App = (): JSX.Element => {
  const [userId, setUserId] = createSignal<number>(1);
  const [user] = createResource(userId, fetchUser);

  return (
    <>
      <input
        type="number"
        min="1"
        placeholder="Enter Numeric Id"
        value={userId() || 1}
        onInput={(e) => setUserId(e.currentTarget.valueAsNumber)}
      />
      <span>{user.loading && 'Loading...'}</span>
      <div data-testid="userData">
        <pre>{JSON.stringify(user(), null, 2)}</pre>
      </div>
    </>
  );
};
