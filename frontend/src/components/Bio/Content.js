import { Box, Grid, Paper, styled } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


const ItemRow = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const ItemColumn = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

const title = {
	"name": `Static Name` 
}

const items = [
	{
		id: 0,
		title: "Title-1",
		desc: "Description-1",
	},
	{
		id: 1,
		title: "Title-2",
		desc: "Description-2",
	},
	{
		id: 2,
		title: "Title-3",
		desc: "Description-3",
	},
	{
		id: 3,
		title: "Title-4",
		desc: "Description-4",
	},
];


export default function Content() {
	const dispatch = useDispatch();
	return (
		<React.Fragment>
				<Grid container spacing={2} sx={{ width: '100%'}}>
					{items.map((item, index) => (
						<Grid lg={3} md={3} sm={12} xs={12} item>
							<ItemColumn key={index.id}>{item.id}</ItemColumn>
							<ItemRow sx={{ textAlign: 'left', width: "40"}} key={index.id}>{item.desc}</ItemRow>
						</Grid>
					))}
				</Grid>
		</React.Fragment>

	)
}