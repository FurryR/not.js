/**
 * Copyright(c) FurryR(凌) @ Simplicity Studio 2023.
 * This program was under the MIT License.
 */
import type { Runtime, ExtensionInfo, ExportInfo } from './runtime'
type JSONType = 'null' | 'number' | 'boolean' | 'string' | 'array' | 'object'
const iconURL =
    'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOTIiIGhlaWdodD0iMTg1IiB2aWV3Qm94PSIwLDAsMjkyLDE4NSI+IDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzMsLTg3KSI+IDxnIGRhdGEtcGFwZXItZGF0YT0neyJpc1BhaW50aW5nTGF5ZXIiOnRydWV9JyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiID4gPHBhdGggZD0iTTE3MywyNzJ2LTE4NWgyOTJ2MTg1eiIgZmlsbD0iIzkwOTA5MCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+IDxwYXRoIGQ9Ik0xNzMsMjcydi0xODVoMjkydjE4NXoiIGZpbGw9IiM5MDkwOTAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPiA8dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNjksMTg3KSBzY2FsZSgwLjksMC45KSIgZm9udC1zaXplPSI0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iI2UzZTNlMyIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNlM2UzZTMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiID4gPHRzcGFuIHg9IjAiIGR5PSIwIj5Ob3QuanM8L3RzcGFuPiA8L3RleHQ+IDx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwNywxMjIpIHNjYWxlKDAuNSwwLjUpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjYWRhZGFkIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iSmV0YnJhaW5zIE1vbm8iIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiID4gPHRzcGFuIHg9IjAiIGR5PSIwIj57fTwvdHNwYW4+IDwvdGV4dD4gPHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDE4LDIzNykgc2NhbGUoMC41LDAuNSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNhZGFkYWQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJKZXRicmFpbnMgTW9ubyIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgPiA8dHNwYW4geD0iMCIgZHk9IjAiPltdPC90c3Bhbj4gPC90ZXh0PiA8dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzUsMjM4KSBzY2FsZSgwLjQsMC40KSIgZm9udC1zaXplPSI0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iI2FkYWRhZCIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IkpldGJyYWlucyBNb25vIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIiA+IDx0c3BhbiB4PSIwIiBkeT0iMCI+eyJrZXkiOiJ2YWx1ZSJ9PC90c3Bhbj4gPHRzcGFuIHg9IjAiIGR5PSI0OHB4Ij57Ik5vdC5qcyI6WyJDQ1ciLCAiSlNPTiJdfTwvdHNwYW4+IDwvdGV4dD4gPHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDIxLDI1OCkgc2NhbGUoMC42LDAuNSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNkOWQ5ZDkiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJTYW5zIFNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIiA+IDx0c3BhbiB4PSIwIiBkeT0iMCI+fDwvdHNwYW4+IDwvdGV4dD4gPHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDE5LDE1Nikgc2NhbGUoMC41LDAuNSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNhZGFkYWQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJKZXRicmFpbnMgTW9ubyIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgPiA8dHNwYW4geD0iMCIgZHk9IjAiPiIgIjwvdHNwYW4+IDwvdGV4dD4gPHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTkxLDE5MCkgc2NhbGUoMC41LDAuNSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNhZGFkYWQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJKZXRicmFpbnMgTW9ubyIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgPiA8dHNwYW4geD0iMCIgZHk9IjAiPicgJzwvdHNwYW4+IDwvdGV4dD4gPHBhdGggZD0iTTI1MywxOTloMTM0IiBmaWxsPSJub25lIiBzdHJva2U9IiNkNWQ1ZDUiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4gPHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjkwLDIyMCkgc2NhbGUoMC41LDAuNSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNiZGJkYmQiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJKZXRicmFpbnMgTW9ubyIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCIgPiA8dHNwYW4geD0iMCIgZHk9IjAiPnsmIzE2MDsmIzE2MDsmIzE2MDt9PC90c3Bhbj4gPC90ZXh0PiA8dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMDEsMjE4KSBzY2FsZSgwLjQsMC40KSIgZm9udC1zaXplPSI0MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgZmlsbD0iI2NiY2JjYiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9IkpldGJyYWlucyBNb25vIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIiA+IDx0c3BhbiB4PSIwIiBkeT0iMCI+anNvbjwvdHNwYW4+IDwvdGV4dD4gPC9nPiA8L2c+PC9zdmc+',
  insetIconURL =
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaGVpZ2h0PSI1MCIgd2lkdGg9IjUwIiB2aWV3Qm94PSIwIDAgNTAgNTAiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxnIHRyYW5zZm9ybT0ibWF0cml4KC45Mzc1IDAgMCAxLjAzMjQgMTMuNSAxMy45OTkpIiBzdHlsZT0iIj4gPHRleHQgZmlsbD0icmdiKDI1NSwgMjU1LCAyNTUpIiBmb250LWZhbWlseT0iJ0pldEJyYWlucyBNb25vJywnRmlyYSBDb2RlJyxDb25zb2xhcywnQ2FzY2FkaWEgQ29kZScsbW9ub3NwYWNlIiBmb250LXNpemU9IjMwIiBzdHJva2U9InJnYigwLCAwLCAwKSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHlsZT0iZm9udC1maWxlLXVybDpub25lO2lzLWN1c3RvbS1mb250Om5vbmU7d2hpdGUtc3BhY2U6cHJlIiB4bWw6c3BhY2U9InByZXNlcnZlIj4gPHRzcGFuIHg9Ii0xMCUiIHk9IjQ1JSI+SlM8L3RzcGFuPiA8L3RleHQ+IDwvZz48L3N2Zz4='
class NotJS {
  /**
   * @brief 格式化消息。
   * @param id 消息 id。
   * @returns 格式化完成的消息。
   */
  formatMessage: (id: string) => string
  /**
   * @brief 构造插件。
   * @param runtime 运行时。
   */
  constructor(runtime: Runtime) {
    const fmt = runtime.getFormatMessage({
      'zh-cn': {
        'notjs.extensionName': 'Not.js',
        'notjs.getHelp': '打开帮助文档',
        'notjs.title.parse': '解析',
        'notjs.parseJSON': '解析 [json]',
        'notjs.fromString': '解析字符串 [str] 为 JSON',
        'notjs.title.type': '类型',
        'notjs.asString': '[json] 作为字符串',
        'notjs.asBoolean': '[json] 作为布尔值',
        'notjs.getType': '[json] 的类型',
        'notjs.title.member': '成员',
        'notjs.getMember': '[json] 的成员 [member]',
        'notjs.setMember': '设定 [json] 的成员 [member] 为 [value]',
        'notjs.removeMember': '删除 [json] 的成员 [member]',
        'notjs.exists': '[json] 存在成员 [member]?',
        'notjs.length': '[json] 的长度',
        'notjs.keys': '[json] 的全部键',
        'notjs.values': '[json] 的全部值'
      },
      en: {
        'notjs.extensionName': 'Not.js',
        'notjs.getHelp': 'Open Documentation',
        'notjs.title.parse': 'Parse',
        'notjs.parseJSON': 'parse [json]',
        'notjs.fromString': 'parse string [str] as JSON',
        'notjs.title.type': 'Type',
        'notjs.asString': '[json] as string',
        'notjs.asBoolean': '[json] as boolean',
        'notjs.getType': 'type of [json]',
        'notjs.title.member': 'Member',
        'notjs.getMember': 'get member [member] of [json]',
        'notjs.setMember': 'set member [member] of [json] to [value]',
        'notjs.removeMember': 'remove member [member] of [json]',
        'notjs.exists': 'member [member] exists in [json]?',
        'notjs.length': 'length of [json]',
        'notjs.keys': 'keys of [json]',
        'notjs.values': 'values of [json]'
      }
    })
    this.formatMessage = (id: string) =>
      fmt({ id, default: id, description: id })
  }
  /**
   * @brief 获取插件的信息。
   * @returns 插件的信息
   */
  getInfo(): ExtensionInfo {
    return {
      id: 'FurryR.NotJS' /* 扩展 id */,
      name: this.formatMessage('notjs.extensionName') /* 拓展名 */,
      color1: '#8A8A8A' /* 颜色 */,
      menuIconURI: insetIconURL,
      blockIconURI: insetIconURL,
      blocks: [
        // 帮助
        {
          blockType: 'button',
          text: this.formatMessage('notjs.getHelp'),
          onClick: this.getHelp
        },
        // 解析
        `---${this.formatMessage('notjs.title.parse')}`,
        {
          // 解析 json
          opcode: 'parseJSON',
          blockType: 'reporter',
          text: this.formatMessage('notjs.parseJSON'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // string 转换 JSON
          opcode: 'fromString',
          blockType: 'reporter',
          text: this.formatMessage('notjs.fromString'),
          arguments: {
            str: {
              type: 'string',
              defaultValue: 'Hello World'
            }
          }
        },
        // 类型
        `---${this.formatMessage('notjs.title.type')}`,
        {
          // 变为 string
          opcode: 'asString',
          blockType: 'reporter',
          text: this.formatMessage('notjs.asString'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '""'
            }
          }
        },
        {
          // 变为 boolean
          opcode: 'asBoolean',
          blockType: 'Boolean',
          text: this.formatMessage('notjs.asBoolean'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: 'true'
            }
          }
        },
        {
          // 取类型
          opcode: 'getType',
          blockType: 'reporter',
          text: this.formatMessage('notjs.getType'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        `---${this.formatMessage('notjs.title.member')}`,
        {
          // 获得成员
          opcode: 'getMember',
          blockType: 'reporter',
          text: this.formatMessage('notjs.getMember'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            }
          }
        },
        {
          // 设定成员
          opcode: 'setMember',
          blockType: 'reporter',
          text: this.formatMessage('notjs.setMember'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            },
            value: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // 删除成员
          opcode: 'removeMember',
          blockType: 'reporter',
          text: this.formatMessage('notjs.removeMember'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            }
          }
        },
        {
          // 判断成员是否存在
          opcode: 'exists',
          blockType: 'Boolean',
          text: this.formatMessage('notjs.exists'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            },
            member: {
              type: 'string',
              defaultValue: 'a'
            }
          }
        },
        {
          // 获得长度
          opcode: 'length',
          blockType: 'reporter',
          text: this.formatMessage('notjs.length'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // 获得键
          opcode: 'keys',
          blockType: 'reporter',
          text: this.formatMessage('notjs.keys'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        },
        {
          // 获得值
          opcode: 'values',
          blockType: 'reporter',
          text: this.formatMessage('notjs.values'),
          arguments: {
            json: {
              type: 'string',
              defaultValue: '{}'
            }
          }
        }
      ]
    }
  }
  /**
   * @brief 解析 JSON 内部用到的方法。
   * @param json
   * @returns [0] 解析后的字符串; [1] 解析后的 json
   */
  private _parseJSON(json: string): unknown | undefined {
    try {
      return JSON.parse(json)
    } catch (_) {
      return undefined
    }
  }
  // 帮助
  /**
   * @brief 打开帮助。
   */
  getHelp() {
    window.open(
      'https://www.ccw.site/post/9cb88c31-c4eb-4244-a412-625e33ca6882'
    )
  }
  // 解析
  /**
   * @brief 解析 JSON。
   * @param json json。
   * @returns 解析后的字符串。
   */
  parseJSON({ json }: { json: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return ''
    return JSON.stringify(v)
  }
  /**
   * @brief string 解析为 JSON。
   * @param str 字符串。
   * @returns JSON。
   */
  fromString({ str }: { str: string }): string {
    return JSON.stringify(str)
  }
  // 类型
  /**
   * @brief 转换为 string。
   * @param json json。
   * @returns 转换后的 string
   */
  asString({ json }: { json: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (
      v == null ||
      typeof v == 'string' ||
      typeof v == 'boolean' ||
      typeof v == 'number'
    ) {
      return String(v)
    } else return JSON.stringify(v)
  }
  /**
   * @brief 转换为 boolean。
   * @param json json。
   * @returns 转换后的 boolean。
   */
  asBoolean({ json }: { json: string }): boolean {
    const v = this._parseJSON(json)
    if (v === undefined) return false // check
    if (typeof v == 'boolean' || typeof v == 'number') {
      return Boolean(v)
    } else if (v == null) {
      return false
    } else if (typeof v == 'string' || v instanceof Array) return v.length != 0
    else return Object.keys(v).length != 0
  }
  /**
   * @brief 获得 json 类型。
   * @param json json。
   * @returns 类型。
   */
  getType({ json }: { json: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (v == null) {
      return 'null'
    } else if (
      typeof v == 'string' ||
      typeof v == 'boolean' ||
      typeof v == 'number'
    ) {
      return typeof v as JSONType
    } else if (v instanceof Array) {
      return 'array'
    } else return 'object'
  }
  // 成员
  /**
   * @brief 获得 json 成员。
   * @param json json。
   * @param member 成员名。
   * @returns json 内容。
   */
  getMember({ json, member }: { json: string; member: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (v instanceof Array || typeof v == 'string') {
      // array
      const idx = parseInt(member)
      if (v[idx] === undefined) return 'null' // check
      return JSON.stringify(v[idx])
    } else if (v instanceof Object) {
      // object
      const x = v as { [key: string]: unknown }
      if (x[member] === undefined) return 'null' // check
      return JSON.stringify(x[member])
    } else {
      return 'null'
    }
  }
  /**
   * @brief 设定 json 成员。
   * @param json json。
   * @param member 成员名。
   * @param value 值。
   * @returns 变更后的 json 内容。
   */
  setMember({
    json,
    member,
    value
  }: {
    json: string
    member: string
    value: string
  }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (v instanceof Array) {
      const idx = parseInt(member)
      if (isNaN(idx) || idx < 0) return JSON.stringify(v) // check
      const c = this._parseJSON(value)
      if (c === undefined) return '' // check
      v[idx] = c
    } else if (v instanceof Object) {
      // object
      const c = this._parseJSON(value)
      if (c === undefined)
        return '' // check
      ;(v as { [key: string]: unknown })[member] = c
    } else {
      return JSON.stringify(v)
    }
    return JSON.stringify(v)
  }
  /**
   * @brief 删除 json 成员。
   * @param json json。
   * @param member 成员名。
   * @returns 变更后的 json 内容。
   */
  removeMember({ json, member }: { json: string; member: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (v instanceof Array) {
      const idx = parseInt(member)
      if (v[idx] !== undefined) {
        v.splice(idx, 1)
      }
    } else if (v instanceof Object) {
      // object
      delete (v as { [key: string]: unknown })[member]
    }
    return JSON.stringify(v)
  }
  /**
   * @brief 判断 json 成员是否存在。
   * @param json json。
   * @param member member。
   * @returns 是否存在。
   */
  exists({ json, member }: { json: string; member: string }): boolean {
    const v = this._parseJSON(json)
    if (v === undefined) return false // check
    if (v instanceof Array) {
      return v[parseInt(member)] !== undefined
    } else if (v instanceof Object) {
      // object
      return (v as { [key: string]: unknown })[member] !== undefined
    }
    return false
  }
  /**
   * @brief 获得 json 的长度。
   * @param json json。
   * @returns json 长度。
   */
  length({ json }: { json: string }): '' | number {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (v instanceof Array || typeof v == 'string') {
      return v.length
    } else if (v instanceof Object) {
      return Object.keys(v).length
    }
    return ''
  }
  /**
   * @brief 获得 json 的键。
   * @param json json。
   * @returns 键。实际上是 JSON Array。
   */
  keys({ json }: { json: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (typeof v == 'string' || v instanceof Object) {
      return JSON.stringify(Object.keys(v))
    }
    return '[]'
  }
  /**
   * @brief 获得 json 的值。
   * @param json json。
   * @returns 值。实际上是 JSON Array。
   */
  values({ json }: { json: string }): string {
    const v = this._parseJSON(json)
    if (v === undefined) return '' // check
    if (v instanceof Object || typeof v == 'string') {
      return JSON.stringify(Object.values(v))
    }
    return '[]'
  }
}
void ((window as Window & { tempExt?: ExportInfo<unknown> }).tempExt = {
  Extension: NotJS,
  info: {
    name: 'notjs.extensionName',
    description: 'notjs.description',
    extensionId: 'FurryR.NotJS',
    iconURL,
    insetIconURL,
    featured: true,
    disabled: false,
    collaborator: 'FurryR @ Simplicity Studio',
    doc: 'https://www.ccw.site/post/9cb88c31-c4eb-4244-a412-625e33ca6882'
  },
  l10n: {
    'zh-cn': {
      'notjs.extensionName': 'Not.js',
      'notjs.description': '更快的 Gandi JSON 处理器。'
    },
    en: {
      'notjs.extensionName': 'Not.js',
      'notjs.description': 'Faster JSON processor for Gandi IDE.'
    }
  }
})
