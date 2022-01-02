import { redirect } from "remix";

export const loader = () => {
  return redirect("https://twitch.tv/gregbrimble"); // TODO
};

export default function Live() {
  return (
    <div>
      <h1>Coming soon</h1>
    </div>
  );
}
