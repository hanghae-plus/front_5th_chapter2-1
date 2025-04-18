interface Props {
  points?: number;
}

export default function Points({ points = 0 }: Props) {
  return (
    <span id="loyalty-points" className="text-blue-500 ml-2">
      (포인트: {points})
    </span>
  );
}
