import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { ContentCollection } from '/imports/api/content';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTracker } from 'meteor/react-meteor-data';
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
    panel: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 10
    },
}));

const AdminPage = () => {
    const classes = useStyles();
    const [contentState, setContent] = useState('')
    const content = useTracker(() => ContentCollection.find().fetch());

    const handleEditorChange = (text, editor) => {
        setContent(text)
    }

    const save = () => {
        ContentCollection.update(content[0]._id, { 
            $set: {
                content: contentState,
                updatedAt: new Date()
            }
        }, (err) => {
            if (!err) {
                toast('Your text successfully changed')
            }
        })
    }

    if (!content[0]) {
        return (
            <div>Loading</div>
        )
    }

    return (
        <div>
            <div className={classes.panel}>
                <Button color='primary' type="submit" onClick={save}>Save</Button>
            </div>
            
            <Editor
                initialValue={content[0].content}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                }}
                onEditorChange={handleEditorChange}
            />
        </div>
    )
}

export default AdminPage