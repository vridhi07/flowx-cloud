import React, {useEffect, createRef, useState } from 'react';
import Chart from 'chart.js/auto';


function LineChartGrpah({ brainData }) {
	const chartRef = createRef();
	const [chatValueList, setChartValueList] = useState({
		deltaList: [],
		thetaList: [],
		timeList: [],
		lowBeta: [],
		midBeta: [],
		highBeta: [],
		gammaList: [],
		lowAlphaList: [],
		highAlphaList: [],
		smr: [],
	})

	const brain_data = () => {
		let deltaList = [];
		let thetaList = [];
		let lowAlphaList = [];
		let highAlphaList = [];
		let smr = [];
		let lowBeta = [];
		let midBeta = [];
		let highBeta = [];
		let gammaList = [];
		let timeList = [];
		brainData && brainData?.values?.map(val => {
			deltaList.push(val.Delta * 10000000);
			thetaList.push(val.Theta * 10000000);
			lowAlphaList.push(val?.Alpha_1 * 10000000);
			highAlphaList.push(val?.Alpha_2 * 10000000);
			smr.push(val?.Beta * 10000000);
			lowBeta.push(val?.Beta_1 * 10000000);
			midBeta.push(val?.Beta_2 * 10000000);
			highBeta.push(val?.Gamma_1 * 10000000);
			gammaList.push(val?.Gamma_2 * 10000000);
			timeList.push(val.Time);
		});
		setChartValueList({
			...chatValueList,
			deltaList: deltaList,
			thetaList: thetaList,
			timeList: timeList,
			lowBeta: lowBeta,
			midBeta: midBeta,
			highBeta: highBeta,
			gammaList: gammaList,
			lowAlphaList: lowAlphaList,
			highAlphaList: highAlphaList,
			smr: smr,
		})
	}

	useEffect(() => {
		let chartStatus = Chart.getChart("myChart");
		if (chartStatus != undefined) {
			chartStatus.destroy();
		}
		const ctx = chartRef?.current?.getContext("2d");
		if (chatValueList?.timeList?.length) {
			new Chart(ctx, {
				type: "line",
				data: {
					labels: chatValueList?.timeList,
					datasets: [
						{
							label: 'Delta',
							data: chatValueList?.deltaList,
							fill: false,
							borderColor: '#BA74EE',
							tension: 0.1,
						},
						{
							label: 'Theta',
							data: chatValueList?.thetaList,
							fill: false,
							borderColor: '#072E5C',
							tension: 0.1,
							
						},
						{
							label: 'Low Alpha',
							data: chatValueList?.lowAlphaList,
							fill: false,
							borderColor: '#3ABDD6',
							tension: 0.1
						},
						{
							label: 'High Alpha',
							data: chatValueList?.highAlphaList,
							fill: false,
							borderColor: '#4A9529',
							tension: 0.1
						},
						{
							label: 'SMR',
							data: chatValueList?.smr,
							fill: false,
							borderColor: '#F7D638',
							tension: 0.1,
						},
						{
							label: 'Low Beta',
							data: chatValueList?.lowBeta,																																																																																																																																																																																																																																																																																												
							fill: false,
							borderColor: '#E79D2D',
							tension: 0.1
						},
						{
							label: 'Mid Beta',
							data: chatValueList?.midBeta,
							fill: false,
							borderColor: '#C03427',
							tension: 0.1
						},
						{
							label: 'High Beta',
							data: chatValueList?.highBeta,
							fill: false,
							borderColor: '#F7BAC5',
							tension: 0.1
						},
						{
							label: 'Gamma',
							data: chatValueList?.gammaList,
							fill: false,
							borderColor: '#6A4299',
							tension: 0.1,
						}
					],
					
				},
			
			});
		}
	}, [chatValueList])

	useEffect(() => {
		if (brainData && brainData?.values?.length) {
			brain_data()
		}
	}, [brainData])

	return (
		<>
			<canvas
				style={{ width: "100%", zIndex: 100, minHeight: '700px' }}
				id="myChart"
				ref={chartRef}
			/>
		</>
	)

}
export default LineChartGrpah;

