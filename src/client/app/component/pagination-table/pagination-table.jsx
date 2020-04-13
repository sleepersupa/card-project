import React from "react";
import {Pagination} from "./pagination/pagination";
export class PaginationTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            loading :false ,
            page :1
        };
    };

    componentDidMount(){
        this.props.api().then(()=>{
            this.setState({ loading :false })
        })
    }
    // componentWillReceiveProps(nextProps){
    //     this.props.api().then(()=>{
    //         this.setState({ loading :false })
    //     })
    // }

    refresh(){
        const {api} = this.props;
        api().then(()=>{
            this.setState({loading : false })
        })
    }


    render(){
        const {columns,list, redirect =null,perPage=10} =this.props;
        const {page} =this.state;
        console.log(list);
        return(
            <div className="pagination-table-cover">
                <table>
                    <thead>
                        <tr>
                            {columns && columns.map((o,i)=>{
                               return(
                                   <td
                                       className={o.classNames}
                                       style={{width : o.width && o.width}}
                                       key={i}>
                                       {
                                           o.renderHeader && o.renderHeader()
                                       }
                                       {
                                           o.label &&  <div className="cell">{o.label}</div>
                                       }
                                   </td>
                               )

                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list && columns && list.slice( (page-1)*perPage, page*perPage ).map((o,i) =>{
                                return(
                                    <tr
                                        // onClick={()=>redHoirect && redirect(o.build_name)}
                                        key={i}>
                                            {
                                                columns.map((u,j) => <td
                                                    className={u.classNames}
                                                    key={i+""+j}>
                                                    {
                                                        // j==0 ? <div className="cell">{i+1}</div>: (
                                                            u.renderCell && u.renderCell(o)
                                                        // )
                                                    }
                                                </td>)
                                            }
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>

                {
                    !list || list.length==0 ? (<div style={{"textAlign" :"left"}}>No result</div>) :
                        <Pagination
                            total={list.length}
                            pageNum={this.state.page}
                            perPage={perPage}
                            onChangePage={(page)=> this.setState({page: page})}
                        />
                }

            </div>
        );
    }
}