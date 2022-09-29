import {QuestionCircleOutlined } from "@ant-design/icons"
import "./index.scss"
import {Component} from "react"
import '@luna215/molstar/build/viewer/molstar.css'
import { createPluginUI } from '@luna215/molstar/lib/mol-plugin-ui/react18';
import { PluginUIContext } from '@luna215/molstar/lib/mol-plugin-ui/context';
import { DefaultPluginUISpec } from '@luna215/molstar/lib/mol-plugin-ui/spec';

class ViewerDemo {
    plugin;
    async init(target) {
        this.plugin = await createPluginUI(typeof target === 'string' ? document.getElementById(target) : target, {
            ...DefaultPluginUISpec(),
            layout: {
                initial: {
                    isExpanded: false,
                    showControls: false,
                    width: '',
                    height: ''
                },
            },
            components: {
                controls: { left: 'none', right: 'none', top: 'none', bottom: 'none' }
            }
        });
    }
}


class  First extends Component {

    componentDidMount(){
        const viewerDemo = new ViewerDemo();
        viewerDemo.init(`molStarBox`).then(() => {});
        window.viewerDemo = viewerDemo;
    }

    render(){
        const views = [
                {
                    name: 'default view',
                    label: '(overall, and specifically hydrogen bonds)'
                },{
                    name: 'molecular surface view',
                    label: '(mainly for visualizing steric interactions)'
                },{
                    name: 'electrostatic view',
                    label: '(mainly for visualizing electrostatic interactions)'
                },{
                    name: 'non-bonded interaction view',
                    label: '(mainly for visualizing non-bonded interactions)'
                },
            ],
            issues = [
                {
                    name: 'Issue item 1 (Selectable)'
                },{
                    name: 'Issue item 2 (Selectable)'
                },{
                    name: 'Issue item 3 (Selectable)'
                },{
                    name: 'Issue item 4 (Selectable)'
                }
            ]
        return (
            <div className="wrapper">
                <div className="mol-region">
                    <div className="mol-container" id="molStarBox">Mol* window</div>
                    <div className="bar">protein sequence (selectable)</div>
                    <div className="views-list">
                        <div className="view-items">
                            {views.map((item,index) => {
                                return (
                                    <div className="item">
                                        <div className="item-b">{item.name}</div>
                                        <div className="item-t">{item.label}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="view-buttons">
                            <div className="item">
                                <div className="item-b">view modification history</div>
                            </div>
                            <div className="item">
                                <div className="item-b">choose pocket</div>
                                <div className="item-t">(can also add pocket of a second protein for negative optimization)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tool-region">
                    <div className="ketcher-container">Ketcher window</div>
                    <div className="energy-box">
                        <div className="primary-title">predicted binding energy </div>
                        <div className="content"> -16 kcal/mol</div>
                    </div>
                    <div className="issues-box">
                        <div className="primary-title">
                            <span style={{marginRight: '8px'}}>Issues identified</span>
                            <QuestionCircleOutlined />
                        </div>
                        <div className="issues-list">
                            {issues.map(item => {
                                return (
                                    <div className="issues">{item.name}</div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="suggested-box">
                        <div className="primary-title">Suggested changes</div>
                        <div className="suggested-list">
                            <div className="suggested-wrap">
                                <div className="suggested-item">
                                    <div className="name">new structure 1</div>
                                    <div className="text">predicted binding energy: -20 kcal/mol</div>
                                </div>

                                <div className="suggested-item">
                                    <div className="name">new structure 1</div>
                                    <div className="text">predicted binding energy: -20 kcal/mol</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default First
