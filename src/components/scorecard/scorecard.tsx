type ScorecardProps = {
	scoreboard: Array<{ overs: number; runs: number }>;
};

const Scorecard = ({ scoreboard }: ScorecardProps) => {
	return (
		<div className="mt-4 text-center w-screen">
			<table className="border-collapse mx-auto w-1/2">
				<thead>
					<tr className="bg-blue-500 text-white">
						<th className="px-4 py-2 border">Overs</th>
						<th className="px-4 py-2 border">Runs</th>
					</tr>
				</thead>
				<tbody>
					{scoreboard.map((entry, index) => (
						<tr
							key={index}
							className="odd:bg-green-100 even:bg-indigo-200">
							<td className="px-4 py-2 border">{entry.over}</td>
							<td className="px-4 py-2 border">{entry.run}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Scorecard;
