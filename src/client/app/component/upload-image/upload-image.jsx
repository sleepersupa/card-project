import React from "react";
import {uploadApi} from "../../../api/upload/upload-api";
import classnames from 'classnames'
export class UploadImage extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };
    handleImgFile(e){
        // e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        uploadApi.upload(file).then(data=> {
            let parseData = JSON.parse(data)
            this.props.onChange(parseData.filePath);
        })

        // reader.onloadend = () => {
        //     console.log(reader)
        //     this.setState({
        //         file: file,
        //         imagePreviewUrl: reader.result
        //     });
        // }
        //
        // reader.readAsDataURL(file)

    }
    handleSubmit(){
        uploadApi.upload(this.state.file).then(data=> console.log(data))
    }
    render(){
        const {height,classNames, filePath , multiple } =this.props;
        return(
            <div className={classnames('upload-image',...classNames)}>
                <input
                    type="file"
                    className="inputImage"
                    multiple={multiple}
                    onChange={(e)=>this.handleImgFile(e)}
                    accept="image/x-png,image/gif,image/jpeg"
                    // ref={inputFile => this.inputFile= inputFile}
                />
                {/*<button*/}
                    {/*onClick={()=> this.handleSubmit()}*/}
                {/*>*/}
                    {/*Sub*/}
                {/*</button>*/}
                <div>
                    <img height={height} src={filePath || null} id='blah' alt=""/>
                </div>


            </div>
        );
    }
}