# import dash
# from dash import dcc, html, Output, Input
# import plotly.express as px

# app = dash.Dash(__name__)

# fig = px.scatter(x=[1, 2, 3], y=[4, 1, 9], labels={"x": "X", "y": "Y"})

# app.layout = html.Div([
#     dcc.Graph(id='input-comp', figure=fig),
#     html.P(id='output-comp')
# ])

# @app.callback(
#     Output('output-comp', 'children'),
#     Input('input-comp', 'hoverData'), prevent_initial_call=True
# )
# def display_hover_data(data):
#     print(data['points'][0])
#     return str(data)

# if __name__ == '__main__':
#     app.run(debug=True)


from dash import Dash, html, dcc, callback, Input, Output
import pandas as pd
import plotly.express as px
from dash import dash_table

app = Dash(__name__)

# Load the tips dataset
tips_df = pd.read_csv("tips.csv").dropna()

avg_tip_per_day = tips_df.groupby("day", as_index=False)["tip"].mean()

barchart_fig = px.bar(avg_tip_per_day, x="day", y="tip", template='simple_white', title="Average Tip per Day").update_layout({"title_x":0.5})

app.layout = html.Div(
    [html.Div(children=[
        dcc.Graph(id='barchart', figure=barchart_fig)
        , dcc.Graph(id='scatterplot', )
    ], className="parent"),
    html.Div(children= [], id="table-comp")
    ]
)

@callback(Output('scatterplot', 'figure'),Input('barchart', 'clickData'), prevent_initial_call=True)
def myfunction(clicked_data):
    print(clicked_data['points'][0]['x'])
    filtered_df = tips_df[tips_df.day == clicked_data['points'][0]['x']]
    return px.scatter(filtered_df, 'total_bill', 'tip', template="simple_white", title=f"Scatterplot of Total Bill vs Tip ({clicked_data['points'][0]['x']})").update_layout({"title_x":0.5})

@callback(Output('table-comp', 'children'), Input('scatterplot', 'selectedData'), prevent_initial_call=True)
def myfunction2(selected_data):
    return dash_table.DataTable(selected_data["points"], columns=[{"name":"x", "id": "x"}, {"name": "y", "id": "y"}])
if __name__ == '__main__':
    app.run(debug=True)