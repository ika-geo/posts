import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function TextEditor({value, handleText}) {

        return (
            <div className="textEditor">
                <CKEditor
                    editor={ ClassicEditor }
                    data={value}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        handleText(data)
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
}

export default TextEditor;