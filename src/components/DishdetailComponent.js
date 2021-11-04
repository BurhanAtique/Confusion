import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';



    function RenderDish({dish}) {
        return (
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    // getDate(dateString){
    //     const dateOnly=dateString.split("T")[0];
    //     const splitDate=dateOnly.split("-");
    //     const day=splitDate[2];
    //     let month=splitDate[1];
    //     const year=splitDate[0];
    //     if(month==="01"){
    //         month="Jan";
    //     }else if(month==="02"){
    //         month="Feb";
    //     }
    //     else if(month==="03"){
    //         month="Mar";
    //     }
    //     else if(month==="04"){
    //         month="Apr";
    //     }
    //     else if(month==="05"){
    //         month="May";
    //     }
    //     else if(month==="06"){
    //         month="Jun";
    //     }
    //     else if(month==="07"){
    //         month="Jul";
    //     }
    //     else if(month==="08"){
    //         month="Aug";
    //     }
    //     else if(month==="09"){
    //         month="Sep";
    //     }
    //     else if(month==="10"){
    //         month="Oct";
    //     }
    //     else if(month==="11"){
    //         month="Nov";
    //     }
    //     else if(month==="12"){
    //         month="Dec";
    //     }
    //     return month+" "+day+", "+year;
    // }
    // renderComments(comments) {
    //     if (comments != null) {
    //         for (let i = 0; i < comments.length; i++) {
    //             return ([
    //                 <div className="list-unstyled">

    //                     <p className="list-unstyled">
    //                         {comments[0].comment}
    //                     </p>
    //                     <p>
    //                         --{comments[0].author} , {this.getDate(comments[0].date)}
    //                     </p>

    //                     <p>
    //                         {comments[1].comment}
    //                     </p>
    //                     <p>
    //                         --{comments[1].author} , {this.getDate(comments[1].date)}
    //                     </p>
    //                     <p>
    //                         {comments[2].comment}
    //                     </p>
    //                     <p>
    //                         --{comments[2].author} , {this.getDate(comments[2].date)}
    //                     </p>
    //                     <p>
    //                         {comments[3].comment}
    //                     </p>
    //                     <p>
    //                         --{comments[3].author} , {this.getDate(comments[3].date)}
    //                     </p>
    //                     <p>
    //                         {comments[4].comment}
    //                     </p>
    //                     <p>
    //                         --{comments[4].author} , {this.getDate(comments[4].date)}
    //                     </p>


    //                 </div>
    //             ]);
    //         }
    //     } else {
    //         return (
    //             <div>
    //             </div>
    //         );
    //     }
    // }
    function RenderComments({comments}){
        if(comments == null){
            return(<div></div>);
        }
        const showcmnts = comments.map((cmnt) => {
            return(
                <li key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>--{cmnt.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(cmnt.date))}
                    </p>
                </li>
            );
        });

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {showcmnts}
                </ul>
            </div>
        );
    }
    
const DishDetail = (props) =>
{
    if (props.dish != null) {
        return (
            <div class="container">
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.dish.comments} />
                </div>
            </div>
            </div>
        );
    }
    else {
        return (
            <div></div>
        );
    }


}
    
export default DishDetail;